require("dotenv").config();
const express = require("express");
const dbConnect = require("./config/dbConnect");
const cors = require("cors");
const userRoute = require("./route/userRoute");
const errorHandler = require("./error/errorHandler");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/users", userRoute);
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
