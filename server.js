require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/dbConnect");
const cors = require("cors");
const userRoute = require("./route/userRoute");
const errorHandler = require("./error/errorHandler");
const Salary = require("./model/salary");
const Role = require("./model/role");

const app = express();
app.use(cors());
app.use(express.json());
app.use("/users", userRoute);

app.post("/salaries", async (req, res) => {
  console.log("first");
  const role = await Role.findOne({ name: req.body.roleName });
  const salary = new Salary();
  salary.salary = req.body.salary;
  salary.yearsOfExp = req.body.yearsOfExp;
  salary.role_id = role._id;

  await salary.save();
  res.status(201).send("created");
});

app.use(errorHandler);

const init = () => {
  runServer();
};

const runServer = async () => {
  const PORT = process.env.SERVER_PORT;
  await dbConnect();
  app.listen(PORT, () => {
    console.log("Server Running!!!");
  });
};

init();
