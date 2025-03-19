const express = require("express");
const router = express.Router();
const paymentController = require("../controllers/paymentControllers");
const authMiddleware = require("../middlewares/authMiddleware"); // Assuming JWT middleware

// ✅ Define Payment Routes
router.post("/add", authMiddleware, paymentController.createPayment); // Create Payment
router.get("/", authMiddleware, paymentController.getAllPayments); // Get All Payments
router.get("/:id", authMiddleware, paymentController.getPaymentById); // Get Payment by ID
router.put("/:id", authMiddleware, paymentController.updatePayment); // Update Payment
router.delete("/:id", authMiddleware, paymentController.deletePayment); // Delete Payment
// ✅ Get Latest Payment
router.get("/latest", authMiddleware, paymentController.getLatestPayment); // ✅ New Route for Latest Payment



module.exports = router;
