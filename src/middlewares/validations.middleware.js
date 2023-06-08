const { where } = require("sequelize");
const User = require("../models/user.model");
const Repair = require("../models/repair.model");
exports.validUser = (req, res, next) => {
  const { name, email, password, role } = req.body;

  if (!name || !email || !password || !role) {
    return res.status(400).json({
      message: "please fill all fields",
    });
  }
  if (role != "employee" && role !== "client") {
    return res.status(400).json({
      message: "role must be employee or client",
      role,
    });
  }
  next();
};

exports.isUserExist = async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({ where: { id } });

  if (!user) {
    return res.status(404).json({
      message: "user not found",
    });
  }
  next();
};

exports.validRepair = (req, res, next) => {
  const { date, userId, status } = req.body;
  if (!date || !userId || !status) {
    return res.status(400).json({
      message: "please fill all fields",
    });
  }
  if (status != "pending") {
    return res.status(400).json({
      message: "status must be pending",
    });
  }
  next();
};

exports.isRepairExist = (req, res, next) => {
  const { id } = req.params;
  const repair = Repair.findOne({ where: { id } });
  if (!repair) {
    return res.status(404).json({
      message: "repair not found",
    });
  }
  next();
};
