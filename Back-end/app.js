// Import required modules
const express = require("express");
const userRouter = require("./Routes/userRoute");
const productRouter = require("./Routes/productRoute");
const cartRouter = require("./Routes/cartRoute");
const wishListRouter = require("./Routes/wishListRoute");
const cors = require("cors");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");
const mongoSanitize = require("express-mongo-sanitize");
const xss = require("xss-clean");
const hpp = require("hpp");

// Initialize express app
const app = express();

// Middleware to parse cookies
app.use(cookieParser());

// Define whitelist for CORS
var whitelist = [
  "https://alhayl.com",
  process.env.BASE_URL,
  "http://localhost:4000",
];

// CORS options to allow only whitelisted origins
var corsOptions = {
  origin: function (origin, callback) {
    if (!origin || whitelist.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
};

app.use(cors(corsOptions));

// Morgan logger middleware for development environment
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
} else if (process.env.NODE_ENV === "production") {
  app.use(morgan("combined"));
}

// Helmet middleware for securing HTTP headers
app.use(helmet());

// Rate limiting middleware for login route
const limiter = rateLimit({
  max: 3,
  windowMs: 60 * 1000,
  standardHeaders: true,
  legacyHeaders: false,
  message: {
    status: "fail",
    message: "Too many requests, try again in a minute.",
  },
});

// app.use("/Login", limiter);

// Middleware to parse JSON bodies with a limit of 10kb
app.use(express.json({ limit: "10kb" }));

// Middleware to sanitize data against NoSQL query injection
app.use(mongoSanitize());

// Middleware to sanitize user input against XSS attacks
app.use(xss());

// Middleware to protect against HTTP Parameter Pollution attacks
app.use(hpp());

// Middleware to parse URL-encoded bodies
app.use(express.urlencoded({ extended: true }));

// Routes
app.use("/", userRouter);
app.use("/wishlist", wishListRouter);
app.use("/products", productRouter);
app.use("/cart", cartRouter);

// Catch-all route for undefined paths
app.all("*", (req, res, next) => {
  res
    .status(404)
    .json({
      status: "fail",
      message: `Cannot find ${req.originalUrl} on this server!`,
    });
});

// Error handling middleware
app.use((error, req, res, next) => {
  console.error(error);
  return res.status(error.statusCode || 500).json({
    status: "fail",
    message: error.message || "Internal Server Error",
  });
});

// Export the app module
module.exports = app;
