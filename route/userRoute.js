const express = require("express");
const { login } = require("../controller/authController");
const { create, getById, getAll } = require("../controller/userController");
const { auth, admin } = require("../middleware/protected");
const router = express.Router();

router.post("/", create);
router.post("/authenticate", login);
router.get("/", auth, admin, getAll);
router.get("/:id", getById);

module.exports = router;
