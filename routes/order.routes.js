const express = require("express");
const router = express.Router();

const { completeOrder } = require("../controllers/order.controller");

router.post("/complete", completeOrder);

module.exports = router;