const express = require("express");
const productController = require("../Controllers/productController");
const authMiddleware = require("../middlewares/authMiddleware");
const { upload } = require("../utils/imageUpload");
const router = express.Router();

router.delete(
  "/image/:_id",
  authMiddleware.protect,
  authMiddleware.restrictTo(["admin", "owner"]),
  productController.deleteProductImage
);
router.patch(
  "/image/:_id",
  authMiddleware.protect,
  authMiddleware.restrictTo(["admin", "owner"]),
  upload.single("image"),
  productController.uploadProductImage
);
router.get("/", productController.getProducts);
router.get("/:id", productController.getProductById);
router.get("/stock/:id", productController.checkStock);

router.get("/search/:query", productController.searchProducts);
router.post(
  "/",
  authMiddleware.protect,
  authMiddleware.restrictTo(["admin", "owner"]),
  upload.single("image"),
  productController.addProduct
);
router.patch(
  "/",
  authMiddleware.protect,
  authMiddleware.restrictTo(["admin", "owner"]),
  productController.updateProduct
);
router.delete(
  "/:_id",
  authMiddleware.protect,
  authMiddleware.restrictTo(["admin", "owner"]),
  productController.deleteProduct
);

module.exports = router;
