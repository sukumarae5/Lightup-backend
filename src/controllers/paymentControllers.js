const paymentService = require("../services/paymentService");

// ✅ Create Payment Controller
exports.createPayment = async (req, res) => {
  try {
    console.log("📥 Incoming Payment Request:", req.body);
    const { user_id, amount, payment_status = 'Pending', payment_method, transaction_id } = req.body;

    if (!user_id || !amount || !payment_method || !transaction_id) {
      return res.status(400).json({ error: "User ID, amount, payment method, and transaction ID are required." });
    }

    const paymentId = await paymentService.createPayment(user_id, amount, payment_status, payment_method, transaction_id);
    console.log("✅ Payment successfully recorded with ID:", paymentId);

    res.status(201).json({ message: "Payment created successfully.", paymentId, transaction_id });
  } catch (error) {
    console.error("❌ Payment Creation Error:", error);
    res.status(500).json({ error: "Server error." });
  }
};

// ✅ Get All Payments Controller
exports.getAllPayments = async (req, res) => {
  try {
    const payments = await paymentService.getAllPayments();
    res.json(payments);
  } catch (error) {
    console.error("❌ Get All Payments Error:", error);
    res.status(500).json({ error: "Server error." });
  }
};

// ✅ Get Payment by ID Controller
exports.getPaymentById = async (req, res) => {
  try {
    const id = req.params.id;
    const payment = await paymentService.getPaymentById(id);
    if (!payment) return res.status(404).json({ error: "Payment not found." });
    res.json(payment);
  } catch (error) {
    console.error("❌ Get Payment by ID Error:", error);
    res.status(500).json({ error: "Server error." });
  }
};

// ✅ Update Payment Controller
exports.updatePayment = async (req, res) => {
  try {
    const id = req.params.id;
    const { amount, payment_status, payment_method } = req.body;
    const updated = await paymentService.updatePayment(id, amount, payment_status, payment_method);
    if (!updated) return res.status(404).json({ error: "Payment not found or not updated." });
    res.json({ message: "Payment updated successfully." });
  } catch (error) {
    console.error("❌ Update Payment Error:", error);
    res.status(500).json({ error: "Server error." });
  }
};

// ✅ Delete Payment Controller
exports.deletePayment = async (req, res) => {
  try {
    const id = req.params.id;
    const deleted = await paymentService.deletePayment(id);
    if (!deleted) return res.status(404).json({ error: "Payment not found or not deleted." });
    res.json({ message: "Payment deleted successfully." });
  } catch (error) {
    console.error("❌ Delete Payment Error:", error);
    res.status(500).json({ error: "Server error." });
  }
};

// ✅ Get Latest Payment Controller
exports.getLatestPayment = async (req, res) => {
  try {
    const user_id = req.user.id; // 🛡️ From JWT middleware

    const latestPayment = await paymentService.getLatestPayment(user_id);

    if (!latestPayment) {
      return res.status(404).json({ error: "No recent payment found." });
    }

    // OPTIONAL: You can also fetch related order items here if required (let me know if you want to add that).

    res.json({
      transaction_id: latestPayment.transaction_id,
      totalAmount: latestPayment.amount,
      payment_status: latestPayment.payment_status,
      payment_method: latestPayment.payment_method,
      created_at: latestPayment.created_at,
    });
  } catch (error) {
    console.error("❌ Get Latest Payment Error:", error);
    res.status(500).json({ error: "Server error." });
  }
};
