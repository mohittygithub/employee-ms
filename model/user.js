const mongoose = require("mongoose");

const validateEmail = function (email) {
  const regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
  return regex.test(email);
};

const userSchema = new mongoose.Schema(
  {
    firstName: {
      type: String,
      maxLength: 50,
    },
    lastName: {
      type: String,
      maxLength: 50,
      required: true,
    },
    email: {
      type: String,
      maxLength: [100, "Email length can't be more that 100 charaters"],
      required: [true, "Please enter your email"],
      validate: [validateEmail, "Please enter a valid email"],
      unique: true,
    },
    password: {
      type: String,
      maxLength: 200,
      required: true,
    },
    mobile: {
      type: String,
      maxLength: 11,
    },
    isActive: {
      type: Boolean,
      default: false,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
      populate: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Department",
      required: true,
      populate: true,
    },
    gender: {
      type: String,
      enum: ["MALE", "FEMALE", "OTHER"],
    },
    dateOfJoining: {
      type: Date,
      required: true,
    },
    yearsOfExperience: {
      type: Number,
      required: true,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("User", userSchema);
module.exports = User;
