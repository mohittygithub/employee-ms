const User = require("../model/user");
const Role = require("../model/role");
const bcrypt = require("bcrypt");
const { tryCatch } = require("../util/tryCatch");
const AppError = require("../error/AppError");
const ApiResponse = require("../util/ApiResponse.");
const Department = require("../model/department");
const Salary = require("../model/salary");

// create new user
const create = tryCatch(async (req, res) => {
  const {
    firstName,
    lastName,
    email,
    password,
    mobile,
    gender,
    role,
    department,
    dateOfJoining,
    yearsOfExp,
  } = req.body;

  if (!lastName || !email || !password) {
    throw new AppError("Incomplete Json", 400);
  }

  const existingUser = await User.findOne({ email });
  if (existingUser) {
    throw new AppError("Email exists", 400);
  }

  const devRole = await Role.findOne({ name: role });
  const adminRole = await Role.findOne({ name: "ADMIN" });
  const dept = await Department.findOne({ name: department });

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = new User();
  newUser.firstName = firstName;
  newUser.lastName = lastName;
  newUser.email = email;
  newUser.password = hashedPassword;
  newUser.mobile = mobile;
  newUser.gender = gender;
  // newUser.role_id = devRole._id;
  newUser.role_id.push(devRole._id);
  newUser.role_id.push(adminRole._id);
  newUser.department_id = dept._id;
  newUser.dateOfJoining = dateOfJoining;
  // newUser.salary_id = salary._id;
  await newUser.save();
  res
    .status(201)
    .send(
      new ApiResponse(201, newUser._id, "Created Successfully", true, 1, [])
    );
});

// get user by id
const getById = tryCatch(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findById(id)
    .populate("role_id")
    .populate("department_id")
    .populate("salary_id")
    .select("-password");
  if (!user) {
    throw new AppError("User Not Found", 400);
  }
  res.status(200).send(new ApiResponse(200, user._id, "", true, 1, [user]));
});

// get all
const getAll = tryCatch(async (req, res, next) => {
  const users = await User.find()
    .populate("role_id")
    .populate("department_id")
    .select("-password");

  res
    .status(200)
    .send(new ApiResponse(200, null, "", true, users.length, users));
});

module.exports = { create, getById, getAll };
