const AppError = require("../error/AppError");
const { tryCatch } = require("../util/tryCatch");
const bcrypt = require("bcrypt");
const User = require("../model/user");
const jwt = require("jsonwebtoken");

const login = tryCatch(async (req, res, next) => {
  const { email, password } = req.body;
  if (!email || !password) throw new AppError("Incomplete login request", 400);

  const existingUser = await User.findOne({ email: email });

  if (!existingUser) throw new AppError("Incorrect Username/Password", 400);

  const isPasswordCorrect = await bcrypt.compare(
    password,
    existingUser.password
  );
  if (!isPasswordCorrect) throw new AppError("Incorrect Password", 400);

  let token = jwt.sign(
    {
      userId: existingUser._id,
      name: existingUser.firstName + " " + existingUser.lastName,
      email: existingUser.email,
    },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
  res.status(200).json({ jwt: token });
});

module.exports = { login };
