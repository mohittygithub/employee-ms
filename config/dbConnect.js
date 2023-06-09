const mongoose = require("mongoose");

const dbConnect = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI, { dbName: "employee_ms" });
    console.log("DB Connected!!!");
  } catch (error) {
    console.log("Error in DB connection: ==>>", error.message);
  }
};

module.exports = dbConnect;
