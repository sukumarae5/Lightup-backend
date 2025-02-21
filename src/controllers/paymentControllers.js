const paymentService = require("../services/paymentService");

exports.addPayment = async (req, res) => {
  try {
    const paymentId = await paymentService.addPayment(req.body);
    res.status(201).json({ success: true, message: "Payment added successfully", paymentId });
  } catch (error) {
    console.error("Error adding payment:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getAllPayments = async (req, res) => {
  try {
    const payments = await paymentService.fetchAllPayments();
    res.status(200).json(payments);
  } catch (error) {
    console.error("Error fetching payments:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const payment = await paymentService.fetchPaymentById(req.params.id);
    if (!payment) {
      return res.status(404).json({ success: false, message: "Payment not found" });
    }
    res.status(200).json(payment);
  } catch (error) {
    console.error("Error fetching payment by ID:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};

exports.deletePayment = async (req, res) => {
  try {
    await paymentService.removePayment(req.params.id);
    res.status(200).json({ success: true, message: "Payment deleted successfully" });
  } catch (error) {
    console.error("Error deleting payment:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};
