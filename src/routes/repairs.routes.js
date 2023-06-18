const express = require('express');

const repairsController = require('../controllers/repairs.controller');

const validations = require('../middlewares/validations.middleware');
const repairMiddleware = require('../middlewares/repair.middleware');
const authMiddleware = require('../middlewares/auth.middleware');
const router = express.Router();
router.use(authMiddleware.protect);
router
  .route('/')
  .get(authMiddleware.restrictTo('employee'), repairsController.findAllRepair)
  .post(validations.createRepairValidation, repairsController.createRepair);

router
  .use(authMiddleware.restrictTo('employee'))
  .use('/:id', repairMiddleware.isRepairExist)
  .route('/:id')
  .get(repairsController.findRepair)
  .patch(authMiddleware.protectAccountOwner, repairsController.updateRepair)
  .delete(authMiddleware.protectAccountOwner, repairsController.deleteRepair);

module.exports = router;
