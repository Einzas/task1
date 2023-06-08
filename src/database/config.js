const { Sequelize } = require("sequelize");

const db = new Sequelize({
  dialect: "postgres",
  host: "localhost",
  username: "postgres",
  password: "root",
  database: "task1",
  port: 5432,
  logging: false,
});

module.exports = { db };
