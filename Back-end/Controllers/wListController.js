const asyncWrapper = require("../middlewares/asyncWrapper");
const User = require("../models/userModel");

// exports.addToWishlist = asyncWrapper(async (req, res) => {
//   const { productId } = req.body;
//   const user = req.user;

//   if (!productId) {
//     return res
//       .status(400)
//       .json({ status: "fail", message: "Product ID is required" });
//   }

//   const updatedUser = await User.findByIdAndUpdate(
//     user._id,
//     { $addToSet: { wishlist: productId } },
//     { new: true }
//   );

//   res.status(200).json({
//     status: "success",
//     message: "Product added to wishlist",
//     data: updatedUser.wishlist,
//   });
// });


// exports.removeFromWishlist = asyncWrapper(async (req, res) => {
//   const { productId } = req.body;
//   const user = req.user;

//   // Check if product exists in wishlist
//   if (!user.wishlist.includes(productId)) {
//     return res
//       .status(400)
//       .json({ message: "This product is not in the wishlist" });
//   }

//   const updatedUser = await User.findByIdAndUpdate(
//     user._id,
//     { $pull: { wishlist: productId } },
//     { new: true }
//   );

//   res.status(200).json({
//     status: "success",
//     message: "Product removed from wishlist",
//     data: updatedUser.wishlist,
//   });
// });



exports.toggleWishlist = asyncWrapper(async (req, res) => {
  const { productId } = req.body;
  const user = req.user;

  if (!productId) {
    return res.status(400).json({
      status: "fail",
      message: "Product ID is required",
    });
  }

  const isInWishlist = user.wishlist.includes(productId);

  const updatedUser = await User.findByIdAndUpdate(
    user._id,
    { [isInWishlist ? "$pull" : "$addToSet"]: { wishlist: productId } },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: isInWishlist
      ? "Product removed from wishlist"
      : "Product added to wishlist",
    data: updatedUser.wishlist,
  });
});


exports.getWishlist = asyncWrapper(async (req, res) => {
  const user = req.user;
  if (!user) {
    return res
      .status(401)
      .json({ status: "fail", message: "User not authenticated" });
  }

  const data = await user.populate("wishlist");

  res.status(200).json({
    status: "success",
    length: data.wishlist.length || 0,
    data: data.wishlist,
  });
}); 


exports.clearWishlist = asyncWrapper(async (req, res) => {
  const user = req.user;

  if (!user) {
    return res
      .status(401)
      .json({ status: "fail", message: "User not authenticated" });
  }

  const data = await User.findByIdAndUpdate(
    user._id,
    { wishlist: [] },
    { new: true }
  );

  res.status(200).json({
    status: "success",
    message: "Cart has been cleared successfully",
    data: data.wishlist,
  });
});
