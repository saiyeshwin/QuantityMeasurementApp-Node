const express = require("express");

const router = express.Router();

const operationController = require("../controllers/operationController");

const protect = require("../middleware/authMiddleware");


// OPERATIONS

router.post("/add", protect, operationController.add);

router.post("/subtract", protect, operationController.subtract);

router.post("/multiply", protect, operationController.multiply);

router.post("/divide", protect, operationController.divide);

router.post("/compare", protect, operationController.compare);

router.post("/convert", protect, operationController.convert);


module.exports = router;