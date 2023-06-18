const { DataTypes } = require('sequelize');
const { db } = require('../database/config');

const User = db.define('user', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  name: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  email: {
    type: DataTypes.TEXT,
    allowNull: false,
    unique: true,
  },
  password: {
    type: DataTypes.TEXT,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('employee', 'client'),
    defaultValue: 'client',
  },
  status: {
    type: DataTypes.ENUM('available', 'unavailable'),
    allowNull: false,
    defaultValue: 'available',
  },
});
module.exports = User;
