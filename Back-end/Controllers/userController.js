const asyncWrapper = require("../middlewares/asyncWrapper");
const User = require("../models/userModel");
const mongoose = require("mongoose");

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
  const user = await User.findById(req.user.id);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }
  await User.findByIdAndUpdate(req.user.id, { active: false });
  res.status(200).json({
    status: "success",
    message: "Your account has been deactivated",
  });
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

exports.UpdateMe = asyncWrapper(async (req, res) => {
  try {
    if (req.body.password || req.body.passwordConfirm) {
      return res
        .status(403)
        .json({ message: "This route is not for password updates" });
    }

    const filteredBody = Filter(
      req.body,
      "FirstName",
      "LastName",
      "phone",
      "gender"
    );

    const user = await User.findByIdAndUpdate(req.user.id, filteredBody, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({
      message: "Your profile has been updated successfully",
      user,
    });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error updating user", error: err.message });
  }
});

exports.getAddress = asyncWrapper(async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.status(401).json({ message: "You need to log in first" });
  }
  res.status(200).json({
    message: user.address?.length
      ? "Addresses found"
      : "No addresses available",
    length: user.address?.length,
    data: user.address || [],
  });
});

exports.addAddress = asyncWrapper(async (req, res) => {
  const userId = req.user?._id;
  if (!userId) {
    return res.status(401).json({ message: "You need to log in first" });
  }

  const filter = Filter(
    req.body,
    "name",
    "phone",
    "department",
    "street",
    "building",
    "city",
    "state",
    "postalCode",
    "isDefault"
  );

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  if (filter.isDefault) {
    user.address = user.address.map((addr) => ({
      ...addr,
      isDefault: false,
    }));
  } else if (user.address.length === 0) {
    filter.isDefault = true;
  }

  user.address.push(filter);
  await user.save();

  res.status(200).json({
    message: "Address added successfully",
    data: user.address,
  });
});

exports.setDefaultAddress = asyncWrapper(async (req, res) => {
  const userId = req.user?._id;
  const { id } = req.body;

  if (!userId) {
    return res.status(401).json({ message: "You need to log in first" });
  }

  if (!id) {
    return res.status(400).json({ message: "Address ID is required" });
  }

  const user = await User.findById(userId);
  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  const addressExists = user.address.some((addr) => addr._id.toString() === id);
  if (!addressExists) {
    return res.status(404).json({ message: "Address not found" });
  }

  user.address = user.address.map((addr) => ({
    ...addr,
    isDefault: addr._id.toString() === id,
  }));

  await user.save();

  res.status(200).json({
    message: "Default address updated successfully",
    data: user.address,
  });
});

exports.getDefaultAddress = asyncWrapper(async (req, res) => {
  const user = req.user;

  if (!user) {
    return res.status(401).json({ message: "You need to log in first" });
  }

  const address = user.address.find((addr) => addr.isDefault === true);
  if (!address) {
    res.status(404).json({
      message: "No Default Address Found",
    });
  } else {
    res.status(200).json({
      data: address,
    });
  }
});

exports.updateAddress = asyncWrapper(async (req, res) => {
  const { id } = req.body;
  const userId = req.user._id;

  if (!userId) {
    return res.status(401).json({ message: "You need to log in first" });
  }
  if (!id) {
    return res.status(400).json({ message: "Address ID is required" });
  }

  const objectId = new mongoose.Types.ObjectId(id);

  const Data = Filter(
    req.body,
    "name",
    "phone",
    "department",
    "street",
    "building",
    "city",
    "state",
    "postalCode",
    "isDefault"
  );

  const user = await User.findOne({ _id: userId, "address._id": objectId });

  if (!user) {
    return res
      .status(404)
      .json({ message: "Sorry, no address found for this ID" });
  }

  const updatedUser = await User.findOneAndUpdate(
    { _id: userId, "address._id": objectId },
    { $set: { "address.$": { ...Data, _id: objectId } } },
    { new: true, runValidators: true }
  );

  res.status(200).json({
    message: "Address updated successfully",
    data: updatedUser.address,
  });
});

exports.deleteAddress = asyncWrapper(async (req, res) => {
  const { id } = req.body;
  const userId = req.user?._id;

  if (!userId) {
    return res.status(401).json({ message: "You need to log in first" });
  }
  if (!id) {
    return res.status(400).json({ message: "Address ID is required" });
  }

  if (!req.user.address?.length) {
    return res
      .status(404)
      .json({ message: "No addresses found for this user" });
  }

  const isFound = req.user.address.find((addr) => addr._id.toString() === id);

  if (!isFound) {
    return res.status(404).json({ message: "Sorry, no address found" });
  }

  const user = await User.findByIdAndUpdate(
    userId,
    { $pull: { address: { _id: new mongoose.Types.ObjectId(id) } } },
    { new: true, runValidators: true }
  );

  if (!user) {
    return res
      .status(404)
      .json({ message: "Sorry, no address found for this ID" });
  }

  res.status(200).json({
    message: "Address deleted successfully",
    data: user.address,
  });
});
