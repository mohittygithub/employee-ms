const express = require("express");
const { login } = require("../controller/authController");
const { create, getById, getAll } = require("../controller/userController");
const { auth, admin } = require("../middleware/protected");
const router = express.Router();

router.post("/authenticate", login);
router.post("/", auth, admin, create);
router.get("/", getAll);
router.get("/:id", auth, getById);

module.exports = router;
