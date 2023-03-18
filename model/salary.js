const mongoose = require("mongoose");

const salarySchema = new mongoose.Schema(
  {
    salary: {
      type: Number,
      required: true,
    },
    yearsOfExp: {
      type: Number,
      required: true,
    },
    role_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Role",
      required: true,
    },
  },
  { timestamps: true }
);

const Salary = mongoose.model("Salary", salarySchema);
module.exports = Salary;
