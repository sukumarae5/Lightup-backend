const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");
const authenticate = require("../middlewares/authMiddleware");

router.post("/create", authenticate, orderController.createOrder);
router.post("/:id/tracking", authenticate, orderController.addTrackingUpdate);
router.get("/:id/tracking", authenticate, orderController.getOrderTracking);

module.exports = router;
