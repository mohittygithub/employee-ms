const express = require("express");
const { create, getById } = require("../controller/userController");
const router = express.Router();

router.post("/", create);
router.get("/:id", getById);

module.exports = router;
