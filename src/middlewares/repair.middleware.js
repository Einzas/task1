const Repair = require('../models/repair.model');
const User = require('../models/user.model');
const AppError = require('../utils/appError');
const catchAsync = require('../utils/catchAsync');

exports.isRepairExist = catchAsync(async (req, res, next) => {
  const { id } = req.params;
  const repair = await Repair.findOne({
    where: {
      id,
      status: 'pending',
    },
    attributes: {
      exclude: ['userId'],
    },
    include: {
      model: User,
      attributes: ['name', 'email', 'role'],
    },
  });
  if (!repair) {
    return next(new AppError('Repair not found', 404));
  }
  req.user = repair.user;
  req.repair = repair;
  next();
});
