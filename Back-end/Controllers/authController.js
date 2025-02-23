const crypto = require("crypto");
const jwt = require("jsonwebtoken");
const User = require("../models/userModel");
const sendEmail = require("../utils/resetPasswordEmail");
const sendConfirmationEmail = require("../utils/sendConfirmationEmail");
const asyncWrapper = require("../middlewares/asyncWrapper");

function generateOTP() {
  return crypto.randomInt(0, 999999).toString().padStart(6, "0");
}

const createSendToken = (user, statusCode, req, res) => {
  try {
    if (!user || !user._id) {
      return res
        .status(400)
        .json({ status: "fail", message: "Invalid user data" });
    }

    if (!process.env.SECRET) throw new Error("SECRET is not defined in .env");

    const expiresInDays = process.env.EXPIRE_DATE
      ? parseInt(process.env.EXPIRE_DATE, 10)
      : 30;

    if (isNaN(expiresInDays) || expiresInDays <= 0) {
      throw new Error("EXPIRE_DATE must be a positive integer");
    }

    const token = jwt.sign(
      { id: user._id, role: user.role },
      process.env.SECRET,
      { expiresIn: `${expiresInDays}d` }
    );

    const cookiesOption = {
      maxAge: 30 * 24 * 60 * 60 * 1000,
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "Lax",
    };
    res.cookie("jwt", token, cookiesOption);

    const sanitizedUser = user.toObject ? user.toObject() : { ...user };
    delete sanitizedUser.password;
    delete sanitizedUser.__v;

    res.status(statusCode).json({
      status: "success",
      data: { user: sanitizedUser },
      token,
    });
  } catch (error) {
    res.status(500).json({ status: "fail", message: "Internal Server Error" });
  }
};

exports.login = asyncWrapper(async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    return res.status(400).json({ message: "Email and Password are required" });

  const user = await User.findOne({ email }).select("+password");

  if (!user || !(await user.correctPassword(password, user.password))) {
    return res.status(401).json({ message: "Invalid email or password" });
  }

  if (!user.emailConfirmed) {
    return res
      .status(403)
      .json({ message: "Please confirm your email before logging in" });
  }

  createSendToken(user, 200, req, res);
});

exports.signup = asyncWrapper(async (req, res) => {
  const { FirstName, LastName, email, password, passwordConfirm } = req.body;

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: "Email already exists" });
  }

  const otpCode = generateOTP();
  const hashedOtp = crypto.createHash("sha256").update(otpCode).digest("hex");

  global.tempUsers = global.tempUsers || {};
  global.tempUsers[email] = {
    FirstName,
    LastName,
    email,
    password,
    passwordConfirm,
    emailConfirmToken: hashedOtp,
    emailConfirmExpires: Date.now() + 5 * 60 * 1000,
  };

  const emailSent = await sendConfirmationEmail({ email, FirstName, otpCode });
  if (!emailSent) {
    delete global.tempUsers[email];
    return res
      .status(500)
      .json({ message: "Failed to send confirmation email" });
  }

  res.status(200).json({
    status: "success",
    message:
      "A confirmation email has been sent. Please verify your email using the OTP to complete registration.",
  });
});

exports.confirmEmail = asyncWrapper(async (req, res) => {
  const { email, otpCode } = req.body;

  if (!global.tempUsers || !global.tempUsers[email]) {
    return res.status(400).json({ message: "OTP expired or invalid" });
  }

  const tempUser = global.tempUsers[email];

  if (tempUser.emailConfirmExpires < Date.now()) {
    delete global.tempUsers[email];
    return res.status(400).json({ message: "OTP expired or invalid" });
  }

  const hashedOtp = crypto.createHash("sha256").update(otpCode).digest("hex");
  if (hashedOtp !== tempUser.emailConfirmToken) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  const newUser = new User({
    FirstName: tempUser.FirstName,
    LastName: tempUser.LastName,
    email: tempUser.email,
    password: tempUser.password,
    passwordConfirm: tempUser.passwordConfirm,
    emailConfirmed: true,
  });

  await newUser.save();
  delete global.tempUsers[email];

  res
    .status(200)
    .json({ status: "success", message: "Email confirmed successfully" });
});

exports.regenerateOTP = asyncWrapper(async (req, res) => {
  const { email } = req.body;

  if (!global.tempUsers || !global.tempUsers[email]) {
    return res.status(400).json({ message: "OTP expired or invalid" });
  }

  const tempUser = global.tempUsers[email];

  const otpCode = generateOTP();
  const hashedOtp = crypto.createHash("sha256").update(otpCode).digest("hex");

  tempUser.emailConfirmToken = hashedOtp;
  tempUser.emailConfirmExpires = Date.now() + 5 * 60 * 1000;

  const emailSent = await sendConfirmationEmail({
    email,
    FirstName: tempUser.FirstName,
    otpCode,
  });

  if (!emailSent) {
    return res.status(500).json({ message: "Failed to resend OTP" });
  }

  res.status(200).json({
    status: "success",
    message: "A new OTP has been sent to your email.",
  });
});

exports.forgetPassword = asyncWrapper(async (req, res) => {
  const user = await User.findOne({ email: req.body.email });
  if (!user)
    return res.status(404).json({ message: "No user with this email" });

  const otpCode = generateOTP();
  const hashedOtp = crypto.createHash("sha256").update(otpCode).digest("hex");

  global.tempUsers = global.tempUsers || {};
  global.tempUsers[user.email] = {
    email: user.email,
    passwordResetToken: hashedOtp,
    passwordResetExpires: Date.now() + 5 * 60 * 1000,
  };

  const emailSent = await sendEmail({
    email: user.email,
    userName: user.FirstName,
    otpCode,
  });

  if (!emailSent) {
    delete global.tempUsers[user.email];
    return res.status(500).json({ message: "Failed to send reset email" });
  }

  res.status(200).json({ message: "Password reset OTP sent" });
});

exports.validateResetToken = asyncWrapper(async (req, res) => {
  const { email, otpCode } = req.body;

  if (!global.tempUsers || !global.tempUsers[email]) {
    return res.status(400).json({ message: "OTP expired or invalid" });
  }

  const tempUser = global.tempUsers[email];

  if (tempUser.passwordResetExpires < Date.now()) {
    delete global.tempUsers[email];
    return res.status(400).json({ message: "OTP expired or invalid" });
  }

  const hashedOtp = crypto.createHash("sha256").update(otpCode).digest("hex");
  if (hashedOtp !== tempUser.passwordResetToken) {
    return res.status(400).json({ message: "Invalid OTP" });
  }

  global.tempUsers[email].otpValidated = true;

  res.status(200).json({ message: "OTP is valid" });
});

exports.resetPassword = asyncWrapper(async (req, res) => {
  const { email, password, passwordConfirm } = req.body;
  if (!global.tempUsers || !global.tempUsers[email]) {
    return res.status(400).json({ message: "OTP validation required" });
  }

  const user = await User.findOne({ email });
  if (!user) return res.status(404).json({ message: "User not found" });

  if (password !== passwordConfirm)
    return res.status(400).json({ message: "Passwords do not match" });

  user.password = password;
  user.passwordConfirm = passwordConfirm;
  await user.save();
  delete global.tempUsers[email];

  res.status(200).json({ message: "Password reset successfully" });
});

exports.regeneratePasswordOTP = asyncWrapper(async (req, res) => {
  const { email } = req.body;

  if (!global.tempUsers || !global.tempUsers[email]) {
    return res.status(400).json({ message: "OTP expired or invalid" });
  }

  const tempUser = global.tempUsers[email];

  const otpCode = generateOTP();
  const hashedOtp = crypto.createHash("sha256").update(otpCode).digest("hex");

  tempUser.passwordResetToken = hashedOtp;
  tempUser.passwordResetExpires = Date.now() + 10 * 60 * 1000;

  const emailSent = await sendEmail({
    email,
    userName: tempUser.FirstName || "User",
    otpCode,
  });

  if (!emailSent) {
    return res.status(500).json({ message: "Failed to resend OTP" });
  }

  res.status(200).json({ message: "A new OTP has been sent to your email." });
});

exports.logout = (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "None",
  });

  res.status(200).json({ message: "Logged out successfully" });
};
