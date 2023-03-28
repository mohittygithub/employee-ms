const jsonwebtoken = require("jsonwebtoken");
const AppError = require("../error/AppError");
const User = require("../model/user");

// jwt authentication
const auth = async (req, res, next) => {
  let token;
  const { authorization } = req.headers;
  try {
    if (authorization && authorization.startsWith("Bearer")) {
      token = authorization.split(" ")[1];
      const { userId } = jsonwebtoken.verify(token, process.env.JWT_SECRET);

      req.userId = userId;
      next();
    }
  } catch (error) {
    throw new AppError(error.message, 400);
  }

  if (!token) {
    throw new AppError("No token", 400);
  }
};

// admin authorization
const admin = async (req, res, next) => {
  try {
    const user = await User.findById({ _id: req.userId })
      .populate("role")
      .select("-password");

    if (!user.role.name === "ADMIN") {
      return res.status(404).json({
        error: "This role type has no access to this resource.",
        statusCode: 404,
      });
    }
    req.user = user;
    next();
  } catch (error) {
    res.status(404).json({
      error: error.message,
      statusCode: 404,
    });
  }
};

module.exports = { auth, admin };
