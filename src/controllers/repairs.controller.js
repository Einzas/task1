const Repair = require('../models/repair.model');
const User = require('../models/user.model');
const catchAsync = require('../utils/catchAsync');

exports.findAllRepair = catchAsync(async (req, res, next) => {
  const repairs = await Repair.findAll({
    where: {
      status: 'pending',
    },
    attributes: {
      exclude: ['userId', 'status'],
    },
    include: {
      model: User,
      attributes: ['name', 'email', 'role'],
    },
    order: [['createdAt', 'DESC']],
    limit: 10,
  });
  res.status(200).json({
    status: 'success',
    message: 'Repairs founded! 😉',
    results: repairs.length,
    repairs,
  });
});

exports.findRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;
  res.status(200).json({
    status: 'success',
    message: 'Repair found! 😉',
    repair,
  });
});

exports.createRepair = catchAsync(async (req, res, next) => {
  const { motorsNumber, description, date } = req.body;
  const { id } = req.sessionUser;
  const repair = await Repair.create({
    motorsNumber,
    description,
    date,
    userId: id,
  });
  res.status(201).json({
    status: 'success',
    message: 'Repair created successfully! 😉',
    repair,
  });
});

exports.updateRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;
  await repair.update({
    status: 'completed',
  });
  res.status(200).json({
    status: 'success',
    message: 'Repair completed successfully! 😉',
    repair,
  });
});

exports.deleteRepair = catchAsync(async (req, res, next) => {
  const { repair } = req;
  await repair.update({
    status: 'cancelled',
  });
  res.status(200).json({
    status: 'success',
    message: 'Repair cancelled successfully! 😉',
    repair,
  });
});
