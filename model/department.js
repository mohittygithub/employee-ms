const mongoose = require("mongoose");

const departmentSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      enum: ["IT", "OPRATIONS", "HR", "ADMIN", "ACCOUNTS"],
      maxLength: 50,
      required: true,
    },
  },
  { timestamps: true }
);

const Department = mongoose.model("Department", departmentSchema);
module.exports = Department;
