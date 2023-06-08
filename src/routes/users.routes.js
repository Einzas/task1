const express = require("express");
const usersController = require("../controllers/users.controller");
const validations = require("../middlewares/validations.middleware");

const router = express.Router();

router
  .route("/")
  .get(usersController.getAllUsers)
  .post(validations.validUser, usersController.createUser);

router
  .route("/:id")
  .get(validations.isUserExist, usersController.getUser)
  .patch(validations.isUserExist, usersController.updateUser)
  .delete(validations.isUserExist, usersController.deleteUser);

module.exports = router;
