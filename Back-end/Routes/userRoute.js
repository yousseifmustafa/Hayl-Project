const express = require("express");
const authController = require("../Controllers/authController");
const userController = require("../Controllers/userController");
const authMiddleware = require("../middlewares/authMiddleware");
const { syncWithDatabase } = require("../Controllers/SyncWithDatabase");
const router = express.Router();

router.post("/confirmEmail", authController.confirmEmail);
router.post("/regenerateOtp", authController.regenerateOTP);
router.post("/regeneratePasswordOtp", authController.regeneratePasswordOTP);
router.post("/validateResetOtp", authController.validateResetToken);
router.post("/signup", authController.signup);
router.post("/login", authController.login);

router.post("/forgetPassword", authController.forgetPassword);
router.post("/logout", authController.logout);
router.patch("/resetPassword", authController.resetPassword);

router.patch(
  "/updatePassword",
  authMiddleware.protect,
  userController.updatePassword
);
router.patch("/Me", authMiddleware.protect, userController.UpdateMe);
router.delete("/Me", authMiddleware.protect, userController.deleteMe);
router.get("/Me", authMiddleware.protect, userController.getMe);
router.get(
  "/AllUsers",
  authMiddleware.protect,
  authMiddleware.restrictTo(["admin"]),
  userController.GetAllUsers
);

router.post("/sync", authMiddleware.protect, syncWithDatabase, (req, res) => {
  res.status(200).json({ message: "Login successful and data synced" });
});
module.exports = router;
