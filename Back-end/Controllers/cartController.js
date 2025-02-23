const asyncWrapper = require("../middlewares/asyncWrapper");
const User = require("../Models/userModel");

exports.addToCart = asyncWrapper(async (req, res) => {
  const { product, quantity } = req.body;
  const user = req.user;
  let data;
  if (!user) {
    return res
      .status(401)
      .json({ status: "Fail", message: "Sorry you Need To Login First" });
  }

  const isFound = await User.findOne({
    _id: user._id,
    "cart.product": product,
  });

  if (isFound) {
    data = await User.findByIdAndUpdate(
      user._id,
      {
        $inc: { "cart.$[item].quantity": quantity },
      },
      {
        new: true,
        arrayFilters: [{ "item.product": product }],
      }
    );
  } else {
    data = await User.findByIdAndUpdate(
      user._id,
      {
        $push: {
          cart: { product, quantity },
        },
      },
      { new: true }
    );
  }

  res.status(200).json({
    status: "success",
    message: "Product quantity updated in cart",
    data: data.cart,
  });
});

exports.getCart = asyncWrapper(async (req, res) => {
  const user = req.user;

  if (!user) {
    return res
      .status(401)
      .json({ status: "fail", message: "User not authenticated" });
  }

  const data = await User.findById(user._id).populate("cart.product");

  let totalCartItems = 0;
  let totalCartPrice = 0;

  data?.cart.map((item) => {
    if (!item.product) return null;

    const totalItemPrice = item.product.price * item.quantity;
    const totalPriceAfterSale = item.product.priceAfterSale * item.quantity;

    totalCartItems += item.quantity;
    totalCartPrice += totalItemPrice;

    item.totalItemPrice = totalItemPrice;
    item.totalPriceAfterSale = totalPriceAfterSale;
  });

  res.status(200).json({
    status: "success",
    totalCartItems,
    totalCartPrice,
    data: data?.cart,
  });
});

exports.removeFromCart = asyncWrapper(async (req, res) => {
  const { product } = req.body;
  const user = req.user;

  if (!product) {
    return res
      .status(400)
      .json({ status: "fail", message: "Product ID is required" });
  }

  const data = await User.findByIdAndUpdate(
    user._id,
    {
      $pull: { cart: { product } },
    },
    { new: true }
  );

  if (!data) {
    return res
      .status(404)
      .json({ status: "fail", message: "Product not found in cart" });
  }

  res.status(200).json({
    status: "success",
    message: "Product removed from cart",
    data: data.cart,
  });
});

exports.updateCartItem = asyncWrapper(async (req, res) => {
  const { product, quantity } = req.body;
  const user = req.user;

  if (!product || quantity <= 0) {
    return res
      .status(400)
      .json({ status: "fail", message: "Invalid product ID or quantity" });
  }

  const data = await User.findOneAndUpdate(
    { _id: user._id, "cart.product": product },
    {
      $set: { "cart.$.quantity": quantity }, // تحديث الكمية
    },
    { new: true }
  );

  if (!data) {
    return res
      .status(404)
      .json({ status: "fail", message: "Product not found in cart" });
  }

  res.status(200).json({
    status: "success",
    message: "Cart item updated",
    data: data.cart,
  });
});

exports.clearCart = asyncWrapper(async (req, res) => {
  const user = req.user;

  if (!user) {
    return res
      .status(401)
      .json({ status: "fail", message: "User not authenticated" });
  }

  const data = await User.findByIdAndUpdate(
    user._id,
    { cart: [] }, // مسح السلة
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "Cart has been cleared successfully",
    data: data.cart,
  });
});
