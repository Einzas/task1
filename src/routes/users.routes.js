const express = require('express');
const usersController = require('../controllers/users.controller');
const authController = require('../controllers/auth.controller');

const validations = require('../middlewares/validations.middleware');
const userMiddleware = require('../middlewares/user.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();

router.post('/login', validations.loginValidation, authController.login);

router
  .route('/')
  .get(usersController.getAllUsers)
  .post(
    userMiddleware.validUser,
    validations.createUserValidation,
    usersController.createUser
  );

router
  .use(authMiddleware.protect)
  .route('/:id')
  .get(userMiddleware.isUserExist, usersController.getUser)
  .patch(
    userMiddleware.isUserExist,
    validations.updateUserValidation,
    usersController.updateUser
  )
  .delete(userMiddleware.isUserExist, usersController.deleteUser);

module.exports = router;
