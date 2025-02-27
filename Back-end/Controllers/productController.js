const Product = require("../Models/ProductModel");
const APIFeatures = require("../utils/apiFeatures");
const asyncWrapper = require("../middlewares/asyncWrapper");
const { deleteImageFromCloudinary } = require("../utils/imageUpload");

exports.getProducts = asyncWrapper(async (req, res) => {
  let query = Product.find();
  const features = new APIFeatures(query, req.query).sort();
  let products = await features.query;

  if (req.query.category) {
    const categories = req.query.category
      .split(",")
      .map((c) => c.trim().toLowerCase());

    products = products.filter((product) =>
      categories.includes(product.category.toLowerCase())
    );
  }

  if (req.query.ids) {
    const requestedIds = req.query.ids.split(",").map((id) => id.trim());
    products = products.filter((product) =>
      requestedIds.includes(product._id.toString())
    );
  }

  const totalProducts = products.length;
  const limit = Number(req.query.limit) || 50;
  const page = Number(req.query.page) || 1;
  const totalPages = Math.ceil(totalProducts / limit);
  const skip = (page - 1) * limit;
  const paginatedProducts = products.slice(skip, skip + limit);

  const pagination = {
    totalProducts,
    totalPages,
    currentPage: page,
    pageSize: limit,
  };

  res.status(200).json({
    status: "success",
    length: paginatedProducts.length,
    data: { products: paginatedProducts },
    pagination,
  });
});

exports.searchProducts = asyncWrapper(async (req, res) => {
  const query = req.params.query;
  const { limit = 50, page = 1 } = req.query;

  let filteredQuery = new APIFeatures(
    Product.find({
      $or: [
        { category: { $regex: query, $options: "i" } },
        { name: { $regex: query, $options: "i" } },
        { description: { $regex: query, $options: "i" } },
      ],
    }),
    req.query
  )
    .filter()
    .sort()
    .limitFields();

  const totalProducts = await Product.countDocuments({
    $or: [
      { category: { $regex: query, $options: "i" } },
      { name: { $regex: query, $options: "i" } },
      { description: { $regex: query, $options: "i" } },
    ],
  });

  const features = filteredQuery.paginate();
  const products = await features.query;

  if (products.length === 0) {
    return res.status(404).json({
      status: "fail",
      message: "No products found matching your search.",
    });
  }

  const pagination = {
    totalProducts,
    totalPages: Math.ceil(totalProducts / limit),
    currentPage: Number(page),
    pageSize: Number(limit),
  };

  res.status(200).json({
    status: "success",
    length: products.length,
    data: { products },
    pagination,
  });
});

exports.addProduct = asyncWrapper(async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ message: "Please upload an image" });
  }

  const { name, price, category, description, stock, discount } = req.body;

  const newProduct = new Product({
    name,
    price,
    category,
    description,
    stock,
    discount,
    image: req.file.path,
  });

  await newProduct.save();

  res.status(201).json({
    status: "success",
    message: "Product added successfully",
    data: newProduct,
  });
});

exports.uploadProductImage = asyncWrapper(async (req, res) => {
  const { _id } = req.params;

  const product = await Product.findById(_id);
  if (!product) {
    return res.status(404).json({
      status: "fail",
      message: "Product not found",
    });
  }

  if (!req.file || !req.file.path) {
    return res.status(400).json({
      status: "fail",
      message: "No image uploaded",
    });
  }

  if (product.image) {
    await deleteImageFromCloudinary(product.image);
  }

  const updatedProduct = await Product.findByIdAndUpdate(
    _id,
    { image: req.file.path },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "Image uploaded successfully",
    data: updatedProduct,
  });
});

exports.deleteProductImage = asyncWrapper(async (req, res) => {
  const { _id } = req.params;

  const product = await Product.findById(_id);
  if (!product) {
    return res.status(404).json({
      status: "fail",
      message: "Product not found",
    });
  }

  if (!product.image) {
    return res.status(400).json({
      status: "fail",
      message: "No image found for this product",
    });
  }

  await deleteImageFromCloudinary(product.image);
  await Product.findByIdAndUpdate(_id, { image: null }, { new: true });

  res.status(200).json({
    status: "success",
    message: "Image deleted successfully",
  });
});

exports.deleteProduct = asyncWrapper(async (req, res) => {
  const { _id } = req.params;

  const deletedProduct = await Product.findById(_id);
  if (!deletedProduct) {
    return res.status(404).json({
      status: "fail",
      message: "Product not found",
    });
  }

  await deleteImageFromCloudinary(deletedProduct.image);

  const isFound = await Product.findByIdAndDelete(_id);

  if (!isFound) {
    return res.status(404).json({
      status: "fail",
      message: "Product not found",
    });
  }

  res.status(200).json({
    status: "success",
    message: "Product deleted successfully",
  });
});

exports.updateProduct = asyncWrapper(async (req, res) => {
  const { id, name, price, category, description, stock, discount } = req.body;
  if (!id) {
    return res
      .status(400)
      .json({ status: "fail", message: "Product ID is required" });
  }
  const existingProduct = await Product.findById(id);
  if (!existingProduct) {
    return res
      .status(404)
      .json({ status: "fail", message: "Product not found" });
  }

  const updatedProductData = {
    name,
    price,
    category,
    description,
    stock,
    discount,
  };

  const updatedProduct = await Product.findByIdAndUpdate(
    id,
    updatedProductData,
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "Product updated successfully",
    data: updatedProduct,
  });
});

exports.getProductById = asyncWrapper(async (req, res) => {
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      status: "fail",
      message: "Product not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: product,
  });
});

exports.checkStock = asyncWrapper(async (req, res) => {
  const product = await Product.findById(req.params.id).select("stock");

  if (!product) {
    return res.status(404).json({
      status: "fail",
      message: "Product not found",
    });
  }

  res.status(200).json({
    status: "success",
    stock: product.stock,
  });
});

exports.addReview = asyncWrapper(async (req, res) => {
  const { rating, comment } = req.body;
  const product = await Product.findById(req.params.id);

  if (!product) {
    return res.status(404).json({
      status: "fail",
      message: "Product not found",
    });
  }

  product.reviews.push({ user: req.user._id, rating, comment });
  await product.save();

  res.status(201).json({
    status: "success",
    message: "Review added successfully",
  });
});

exports.getReviews = asyncWrapper(async (req, res) => {
  const product = await Product.findById(req.params.id).select("reviews");

  if (!product) {
    return res.status(404).json({
      status: "fail",
      message: "Product not found",
    });
  }

  res.status(200).json({
    status: "success",
    data: product.reviews,
  });
});
