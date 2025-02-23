require("dotenv").config();
const cloudinary = require("cloudinary").v2;
const multer = require("multer");
const { CloudinaryStorage } = require("multer-storage-cloudinary");

cloudinary.config({
  cloud_name: process.env.CLOUD_NAME || "dl9gghlyx",
  api_key: process.env.API_KEY || 651576597964584,
  api_secret: process.env.API_SECRET || "jJqbV7ICtHGVl-L6MX9JpGLLMhI",
});

const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "product-images",
  },
});

const fileFilter = (req, file, cb) => {
  const imageType = file.mimetype.split("/")[0]; // Corrected 'memetype' to 'mimetype'
  if (imageType === "image") {
    return cb(null, true);
  } else {
    return cb(new Error("File must be an image"), false); // Better error handling
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB file size limit
  fileFilter,
});

module.exports = upload;
