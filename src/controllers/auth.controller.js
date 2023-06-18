const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');
const generateJWT = require('../utils/jwt');
const bcrypt = require('bcrypt');

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;
  const user = await User.findOne({
    where: {
      email,
      status: 'available',
    },
  });
  if (!user) {
    return next(new AppError('User with that email not found!', 404));
  }
  if (!(await bcrypt.compare(password, user.password))) {
    return next(new AppError('Incorrect email/password', 401));
  }
  const token = await generateJWT(user.id);
  res.status(200).json({
    status: 'success',
    message: 'Login successfully! 😉',
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
