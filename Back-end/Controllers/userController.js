const asyncWrapper = require("../middlewares/asyncWrapper");
const User = require("../models/userModel");
const sendOTP = require("../utils/SendOtp");

const Filter = (data, ...desiredData) => {
  const finalData = {};
  Object.keys(data).forEach((el) => {
    if (desiredData.includes(el)) {
      finalData[el] = data[el];
    }
  });
  return finalData;
};

exports.GetAllUsers = async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json({ status: "success", data: users });
  } catch (error) {
    res.status(500).json({ status: "fail", message: error.message });
  }
};

exports.deleteMe = asyncWrapper(async (req, res) => {
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(204).json({
    status: "success",
    data: "",
  });
});

exports.updatePassword = asyncWrapper(async (req, res) => {
  const user = await User.findById(req.user.id).select("+password");
  if (
    !user ||
    !(await user.correctPassword(req.body.oldPassword, user.password))
  )
    return res.status(401).json({ message: "Incorrect old password" });

  if (req.body.newPassword !== req.body.passwordConfirm)
    return res.status(400).json({ message: "Passwords do not match" });

  user.password = req.body.newPassword;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  createSendToken(user, 200, res);
});

// exports.verifyPhone = asyncWrapper(async (req, res) => {
//   try {
//     const { otp } = req.body;
//     const user = await User.findById(req.user.id);

//     if (!user) return res.status(404).json({ message: "User not found" });
//     if (!user.otp || user.otp !== otp || Date.now() > user.otpExpires) {
//       return res.status(400).json({ message: "Invalid or expired OTP" });
//     }

//     user.phone = user.newPhone;
//     user.phoneVerified = true;
//     user.otp = undefined;
//     user.otpExpires = undefined;
//     user.newPhone = undefined;

//     await user.save();

//     res.status(200).json({ message: "Phone number updated successfully" });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error verifying phone", error: err.message });
//   }
// });

// exports.UpdateMe = asyncWrapper(async (req, res) => {
//   try {
//     if (req.body.password || req.body.passwordConfirm) {
//       return res
//         .status(403)
//         .json({ message: "This route is not for password updates" });
//     }

//     const filteredBody = Filter(
//       req.body,
//       "FirstName",
//       "LastName",
//       "phone",
//       "gender"
//     );

//     const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
//       new: true,
//       runValidators: true,
//     });

//     if (!user) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     res.status(200).json({
//       message: "Your profile has been updated successfully",
//       user,
//     });
//   } catch (err) {
//     res
//       .status(500)
//       .json({ message: "Error updating user", error: err.message });
//   }
// });

exports.UpdateMe = asyncWrapper(async (req, res) => {
  try {
    if (req.body.password || req.body.passwordConfirm) {
      return res
        .status(403)
        .json({ message: "This route is not for password updates" });
    }

    const user = await User.findById(req.user.id);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const filteredBody = Filter(req.body, "FirstName", "LastName", "gender");

    if (req.body.phone && req.body.phone !== user.phone) {
      user.otp = user.generateOTP();
      user.otpExpires = Date.now() + 60 * 1000;

      const otpSent = await sendOTP(req.body.phone, user.otp);
      if (!otpSent) {
        return res.status(500).json({ message: "Failed to send OTP" });
      }

      user.newPhone = req.body.phone;
      await user.save();

      return res.status(200).json({
        message: "OTP sent to the new phone number. Please verify to update.",
      });
    }

    const updatedUser = await User.findByIdAndUpdate(
      req.user.id,
      filteredBody,
      {
        new: true,
        runValidators: true,
      }
    );

    res.status(200).json({
      message: "Your profile has been updated successfully",
      user: updatedUser,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating user", error: err.message });
  }
});

exports.getMe = asyncWrapper(async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.status(200).json({
      message: "Success",
      user,
    });
  } catch (err) {
    res.status(500).json({ message: "Error fetching users", error: err });
  }
});
