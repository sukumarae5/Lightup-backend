const express = require("express");
const paymentController = require("../controllers/paymentControllers");

const router = express.Router();

router.post("/add-payment", paymentController.addPayment);
router.get("/get-payments", paymentController.getAllPayments);
router.get("/get-payment/:id", paymentController.getPaymentById);
router.delete("/delete-payment/:id", paymentController.deletePayment);

module.exports = router;
