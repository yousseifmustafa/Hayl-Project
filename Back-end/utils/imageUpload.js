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
  const imageType = file.mimetype.split("/")[0];
  if (imageType === "image") {
    return cb(null, true);
  } else {
    return cb(new Error("File must be an image"), false);
  }
};

const deleteImageFromCloudinary = async (imageUrl) => {
  if (!imageUrl) return;

  try {
    const regex = /\/v\d+\/(.+)\.\w+$/;
    const match = imageUrl.match(regex);
    if (!match) {
      return;
    }

    const imagePublicId = match[1];

    const result = await cloudinary.uploader.destroy(imagePublicId);
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
  }
};

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});

module.exports = { upload, deleteImageFromCloudinary };
