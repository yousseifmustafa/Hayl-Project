const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const crypto = require("crypto");

const userSchema = mongoose.Schema({
  FirstName: {
    type: String,
    minLength: [5, "minimum user length is 5 "],
    maxLength: [30, "maximum user length is 30 "],
    required: [true, "User name is required"],
  },
  LastName: {
    type: String,
    minLength: [5, "minimum user length is 5 "],
    maxLength: [30, "maximum user length is 30 "],
    required: [true, "User name is required"],
  },
  active: {
    type: Boolean,
    default: true,
  },
  password: {
    type: String,
    minLength: [8, "minimum Password length is 8 "],
    maxLength: [128, "maximum Password length is 128 "],
    required: [true, "Password is required"],
    select: false,
    validate: {
      validator: (val) =>
        /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[#^-_=?؟@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
          val
        ),
      message:
        "Password must contain at least one letter, one number, and one special character",
    },
  },
  passwordConfirm: {
    type: String,
    required: false,
    validate: {
      validator: function (val) {
        return val === this.password;
      },
      message: "Passwords do not match",
    },
  },
  email: {
    type: String,
    unique: true,
    lowercase: true,
    required: [true, "Email is required"],
    validate: [validator.isEmail, "Please provide a valid email address"],
    immutable: true,
  },
  photo: {
    type: String,
    default: "default.jpg",
    validate: [validator.isURL, "Please provide a valid URL for the photo"],
  },
  passwordChangedAt: {
    type: Number,
    default: 1212121212,
  },
  role: {
    type: String,
    enum: ["user", "admin", "owner"],
    lowercase: true,
    default: "user",
  },
  cart: [
    {
      product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product",
        required: true,
      },
      quantity: {
        type: Number,
        default: 1,
        min: 1,
      },
      totalItemPrice: { type: Number },
      totalPriceAfterSale: { type: Number },
    },
  ],
  phone: {
    type: String,
    unique: true,
    match: [
      /^(\+20|0)1[0-9]{9}$/,
      "Please enter a valid Egyptian phone number",
    ],
    phoneVerified: { type: Boolean, default: false },
    otp: { type: String },
    otpExpires: { type: Date },
  },
  newPhone: { type: String },
  wishlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Product" }],

  gender: {
    type: String,
    enum: ["male", "female"],
  },

  UserResetToken: String,
  UserResetTokenTime: Date,
  emailConfirmToken: String,
  emailConfirmTokenExpires: Date,
  emailConfirmed: { type: Boolean, default: false },
});

userSchema.methods.generateOTP = function () {
  const otpCode = crypto.randomInt(100000, 999999).toString();
  this.otp = otpCode;
  this.otpExpires = Date.now() + 60 * 1000;
  return otpCode;
};

userSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();

  this.password = await bcrypt.hash(this.password, 12);
  this.passwordConfirm = undefined;
  this.passwordChangedAt = Date.now() - 1000;

  next();
});

userSchema.pre(/^find/, function (next) {
  this.where({ active: { $ne: false } });
  next();
});


// userSchema.methods.generatePasswordResetToken = function () {
//   const rToken = crypto.randomBytes(32).toString("hex");
//   this.UserResetToken = crypto
//     .createHash("sha256")
//     .update(rToken)
//     .digest("hex");
//   this.UserResetTokenTime = Date.now() + 15 * 60 * 1000;
//   setTimeout(
//     () => {
//       this.UserResetToken = undefined; // مسح التوكن تلقائيًا بعد 15 دقيقة
//     },
//     15 * 60 * 1000
//   );

//   return rToken;
// };

// userSchema.methods.generatePasswordResetToken = function () {
//   const otpCode = crypto.randomInt(100000, 999999).toString();
//   this.UserResetToken = otpCode;
//   this.UserResetTokenTime = Date.now() + 5 * 60 * 1000;

//   return otpCode;
// };


userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = Math.floor(this.passwordChangedAt / 1000);
    return JWTTimestamp < changedTimestamp;
  }
  return false;
};

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

const User = mongoose.models.User || mongoose.model("User", userSchema);

module.exports = User;
