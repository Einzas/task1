const User = require('../models/user.model');
const Repair = require('../models/repair.model');
const { body, validationResult } = require('express-validator');

const validField = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ status: 'error', errors: errors.mapped() });
  }
  next();
};

exports.createUserValidation = [
  body('name').exists().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email must be valid'),
  body('password')
    .notEmpty()
    .withMessage('password is required')
    .isLength({ min: 6 })
    .withMessage('password must be at least 6 characters'),
  validField,
];

exports.updateUserValidation = [
  body('name').exists().withMessage('name is required'),
  body('email')
    .notEmpty()
    .withMessage('email is required')
    .isEmail()
    .withMessage('email must be valid'),
  validField,
];

exports.createRepairValidation = [
  body('motorsNumber').exists().withMessage('motorsNumber is required'),
  body('description').exists().withMessage('description is required'),
  body('date').exists().withMessage('date is required'),
  validField,
];

exports.loginValidation = [
  body('email')
    .notEmpty()
    .withMessage('Email cannot be empty!')
    .isEmail()
    .withMessage('Must be a valid email!'),
  body('password')
    .notEmpty()
    .withMessage('Password cannot be empty!')
    .isLength({ min: 8 })
    .withMessage('Password must be at least 6 characters long!'),
  validField,
];
