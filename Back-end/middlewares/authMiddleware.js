const jwt = require("jsonwebtoken");
const User = require("../models/userModel");

exports.protect = async (req, res, next) => {
  let token;
  
  try {
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    } else if (req.cookies && req.cookies.jwt) {
      token = req.cookies.jwt;
    }

    if (!token) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized: No token found",
      });
    }

    const decoded = jwt.verify(token, process.env.SECRET);
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({
        status: "fail",
        message: "Unauthorized: User not found",
      });
    }

    next();
  } catch (error) {
    console.error("Auth Error:", error.message);
    res.status(401).json({
      status: "fail",
      message: "Unauthorized: Invalid token",
    });
  }
};

exports.restrictTo = (roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return res.status(403).json({
        message: `Access denied. Only ${roles} are allowed.`,
      });
    }
    next();
  };
};
