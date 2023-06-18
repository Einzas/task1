const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.validUser = catchAsync(async (req, res, next) => {
  const { name, email, password } = req.body;
  if (!name || !email || !password) {
    return next(new AppError('please fill all fields', 400));
  }
  const user = await User.findOne({
    where: {
      email,
    },
  });
  if (user) {
    return next(new AppError('Email already exists', 400));
  }
  next();
});

exports.isUserExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const user = await User.findOne({
    where: {
      id,
      status: 'available',
    },
    attributes: {
      exclude: ['password'],
    },
  });
  if (!user) {
    return next(new AppError('User not found', 404));
  }
  req.user = user;
  next();
});
