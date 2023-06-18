const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');
const generateJWT = require('../utils/jwt');
const bcrypt = require('bcrypt');

exports.getAllUsers = catchAsync(async (req, res) => {
  const users = await User.findAll({
    where: {
      status: 'available',
    },
    attributes: {
      exclude: ['password'],
    },
  });
  res.status(200).json({
    status: 'success',
    message: 'Get all users',
    results: users.length,
    users,
  });
});

exports.getUser = catchAsync(async (req, res) => {
  const { user } = req;
  res.status(200).json({
    status: 'success',
    message: 'Get a user',
    user,
  });
});

exports.createUser = catchAsync(async (req, res) => {
  const { name, email, password, role, status } = req.body;
  const salt = await bcrypt.genSalt(12);
  const hashedPassword = await bcrypt.hash(password, salt);

  const user = await User.create({
    name,
    email,
    password: hashedPassword,
    role,
    status,
  });
  const token = await generateJWT(user.id);
  res.status(201).json({
    status: 'success',
    message: 'Create a user successfully! 😉',
    user: {
      id: user.id,
      name: user.name,
      email: user.email,
      role: user.role,
      status: user.status,
    },
    token,
  });
});

exports.updateUser = catchAsync(async (req, res) => {
  const { user } = req;
  const { name, email } = req.body;
  await user.update({
    name,
    email,
  });
  res.status(202).json({
    status: 'success',
    message: 'Update a user',
    user,
  });
});

exports.deleteUser = catchAsync(async (req, res) => {
  const { user } = req;
  await user.update({
    status: 'unavailable',
  });
  res.status(204).json({
    status: 'success',
    message: 'User deleted successfully! 😉',
  });
});
