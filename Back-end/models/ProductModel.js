const mongoose = require("mongoose");
const validator = require("validator");

const productSchema = mongoose.Schema(
  {
    name: {
      type: String,
      minLength: [5, "Minimum product name length is 5 characters"],
      maxLength: [30, "Maximum product name length is 30 characters"],
      required: [true, "Product name is required"],
    },
    slug: {
      type: String,
      lowercase: true,
      trim: true,
    },
    category: {
      type: String,
      minLength: [5, "Minimum category length is 15 characters"],
      maxLength: [100, "Maximum category length is 200 characters"],
      required: [true, "Category is required"],
    },
    description: {
      type: String,
      minLength: [15, "Minimum description length is 15 characters"],
      maxLength: [200, "Maximum description length is 200 characters"],
      required: [true, "Description is required"],
    },
    price: {
      type: Number,
      required: [true, "Price is required"],
      validate: {
        validator: function (v) {
          return v > 0;
        },
        message: "Price must be a positive number",
      },
    },
    priceAfterSale: {
      type: Number,
      default: function () {
        return this.price;
      },
      validate: {
        validator: function (v) {
          return v <= this.price;
        },
        message: "Price after sale cannot be greater than the original price",
      },
    },
    rate: {
      type: Number,
      default: 5,
      min: [1, "Rating must be at least 1"],
      max: [5, "Rating must not exceed 5"],
    },
    stock: {
      type: Number,
      required: [true, "Stock quantity is required"],
      min: [0, "Stock cannot be negative"],
      default: 0,
    },
    discount: {
      type: Number,
      min: [0, "Discount cannot be negative"],
      max: [100, "Discount cannot exceed 100%"],
      default: 0,
    },
    image: {
      type: String,
      required: [true, "Image is required"],
      validate: {
        validator: function (v) {
          return validator.isURL(v) && /\.(jpeg|jpg|png|gif)$/i.test(v);
        },
        message:
          "The image must be a valid URL and have a valid image file extension (jpeg, jpg, png, gif)",
      },
    },
    tags: {
      type: [String],
      enum: ["sale", "new", "bestseller", "featured"],
      default: [],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    priceHistory: [
      {
        price: Number,
        date: { type: Date, default: Date.now },
      },
    ],
    reviews: [
      {
        user: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "User  ",
          required: true,
        },
        rating: {
          type: Number,
          required: true,
          min: 1,
          max: 5,
        },
        comment: {
          type: String,
          required: true,
        },
      },
    ],
  },
  { timestamps: true }
);

productSchema.pre("save", function (next) {
  if (this.name) {
    this.slug = `${this.name.toLowerCase().replace(/\s+/g, "-")}-${this._id}`;
  }
  next();
});

const Product =
  mongoose.models.Product || mongoose.model("Product", productSchema);

module.exports = Product;
