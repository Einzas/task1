const User = require("../models/user.model");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.findAll({
      where: {
        status: "available",
      },
    });
    res.status(200).json({
      status: "success",
      message: "Get all users",
      users,
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({
      status: "fail",
      message: "Something went wrong!",
      error,
    });
  }
};

exports.getUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({
      where: {
        id,
        status: "available",
      },
    });
    res.status(200).json({
      status: "success",
      message: "Get a user",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong!",
      error,
    });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { name, email, password, role, status } = req.body;

    const isUserExist = await User.findOne({ where: { email } });
    if (isUserExist) {
      return res.status(400).json({
        status: "fail",
        message: "Email already exist!",
      });
    }
    const user = await User.create({
      name,
      email,
      password,
      role,
      status,
    });
    console.log(role);
    res.status(201).json({
      status: "success",
      message: "Create a user",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong!",
      error,
    });
  }
};

exports.updateUser = async (req, res) => {
  const { id } = req.params;
  const { name, email, role, status, password } = req.body;
  try {
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found!",
      });
    }
    if (role || status || password) {
      return res.status(400).json({
        status: "fail",
        message: "You can't update role or status or password!",
      });
    }
    await user.update({
      name,
      email,
    });
    res.status(202).json({
      status: "success",
      message: "Update a user",
      user,
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong!",
      error,
    });
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const { id } = req.params;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({
        status: "fail",
        message: "User not found!",
      });
    }
    await user.update({
      status: "unavailable",
    });
    res.status(204).json({
      status: "success",
      message: "Delete a user",
    });
  } catch (error) {
    res.status(500).json({
      status: "fail",
      message: "Something went wrong!",
      error,
    });
  }
};
