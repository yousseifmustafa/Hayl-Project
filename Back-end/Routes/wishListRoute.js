const express = require("express");
const router = express.Router();
const wishListController = require("../Controllers/wListController");
const authMiddleware = require("../middlewares/authMiddleware");

router.use(authMiddleware.protect);
router.get("/", wishListController.getWishlist);
router.post("/", wishListController.toggleWishlist);
router.delete("/clear", wishListController.clearWishlist);

module.exports = router;
