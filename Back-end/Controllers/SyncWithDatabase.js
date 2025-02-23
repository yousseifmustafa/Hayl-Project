const asyncWrapper = require("../middlewares/asyncWrapper");
const Product = require("../models/productModel");
const User = require("../models/userModel");

exports.syncWithDatabase = asyncWrapper( async (req, res, next) => {
  try {
      const user = req.user;

    const virtualCart = req.body.virtualCart;
    const virtualWishlist = req.body.virtualWishlist;

    if (!Array.isArray(virtualCart) || !Array.isArray(virtualWishlist)) {
      return res.status(400).json({ message: "Invalid data format" });
    }

    for (let item of virtualCart) {
      const product = await Product.findById(item.product);
      if (!product) continue;

      const existingItemIndex = user.cart.findIndex(
        (cartItem) => cartItem.product.toString() === item.product
      );

      if (existingItemIndex > -1) {
        user.cart[existingItemIndex].quantity += item.quantity;
        user.cart[existingItemIndex].totalItemPrice =
          user.cart[existingItemIndex].quantity * product.price;
        user.cart[existingItemIndex].totalPriceAfterSale =
          user.cart[existingItemIndex].quantity * product.priceAfterSale;
      } else {
        user.cart.push({
          product: item.product,
          quantity: item.quantity,
          totalItemPrice: item.quantity * product.price,
          totalPriceAfterSale: item.quantity * product.priceAfterSale,
        });
      }
    }

    for (let productId of virtualWishlist) {
      if (!user.wishlist.includes(productId)) {
        user.wishlist.push(productId);
      }
    }

    await user.save();
    next();
  } catch (error) {
    console.error("Sync Error:", error);
    return res.status(500).json({ message: "Error syncing data" });
  }
});
