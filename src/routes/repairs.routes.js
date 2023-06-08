const express = require("express");

const repairsController = require("../controllers/repairs.controller");
const validations = require("../middlewares/validations.middleware");
const router = express.Router();

router
  .route("/")
  .get(repairsController.findAllRepair)
  .post(validations.validRepair, repairsController.createRepair);

router
  .route("/:id")
  .get(
    validations.isRepairExist,
    validations.validRepair,
    repairsController.findRepair
  )
  .patch(validations.isRepairExist, repairsController.updateRepair)
  .delete(validations.isRepairExist, repairsController.deleteRepair);

module.exports = router;
