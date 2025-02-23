const express = require("express");
const cartController = require("../Controllers/cartController");
const authMiddleware = require("../middlewares/authMiddleware");

const router = express.Router();

router.get("/", authMiddleware.protect, cartController.getCart);
router.post("/", authMiddleware.protect, cartController.addToCart);
router.patch("/", authMiddleware.protect, cartController.updateCartItem);
router.delete("/", authMiddleware.protect, cartController.removeFromCart);
router.delete("/clear", authMiddleware.protect, cartController.clearCart);

module.exports = router;
