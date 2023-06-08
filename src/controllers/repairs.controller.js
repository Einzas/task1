const Repair = require("../models/repair.model");

exports.findAllRepair = async (req, res) => {
  try {
    const repairs = await Repair.findAll({
      where: {
        status: "pending",
      },
    });
    res.status(200).json({
      message: "Get all repairs",
      repairs,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error,
    });
  }
};

exports.findRepair = async (req, res) => {
  const { id } = req.params;

  try {
    const repair = await Repair.findOne({
      where: {
        id,
        status: "pending",
      },
    });
    if (!repair) {
      return res.status(404).json({
        message: "Repair not found",
      });
    }
    return res.status(200).json({
      message: "Get a repair",
      repair,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error,
    });
  }
};

exports.createRepair = async (req, res) => {
  try {
    const { userId, status, date } = req.body;
    const repair = await Repair.create({
      userId,
      status,
      date,
    });
    res.status(201).json({
      message: "Create a repair",
      repair,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error,
    });
  }
};

exports.updateRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await Repair.findOne({
      where: {
        id,
        status: "pending",
      },
    });

    if (!repair) {
      return res.status(404).json({
        message: "Repair not found",
      });
    }
    repair.update({
      status: "completed",
    });
    res.status(200).json({
      message: "Update a repair",
      repair,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error,
    });
  }
};

exports.deleteRepair = async (req, res) => {
  try {
    const { id } = req.params;
    const repair = await Repair.findOne({
      where: {
        id,
        status: "pending",
      },
    });

    if (!repair) {
      return res.status(404).json({
        message: "Repair not found",
      });
    }
    repair.update({
      status: "cancelled",
    });
    res.status(200).json({
      message: "The repair was cancelled",
      repair,
    });
  } catch (error) {
    res.status(500).json({
      message: "Something went wrong!",
      error,
    });
  }
};
