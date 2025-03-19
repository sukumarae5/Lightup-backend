const Payment = require("../models/payment");

// ✅ Create Payment
const createPayment = async (user_id, amount, payment_status, payment_method, transaction_id) => {
  return await Payment.createPayment(user_id, amount, payment_status, payment_method, transaction_id);
};

// ✅ Get All Payments
const getAllPayments = async () => {
  return await Payment.getAllPayments();
};

// ✅ Get Payment by ID
const getPaymentById = async (id) => {
  return await Payment.getPaymentById(id);
};

const getLatestPayment = async (user_id) => {
  return await Payment.getLatestPayment(user_id);
};



// ✅ Update Payment
const updatePayment = async (id, amount, payment_status, payment_method) => {
  return await Payment.updatePayment(id, amount, payment_status, payment_method);
};

// ✅ Delete Payment
const deletePayment = async (id) => {
  return await Payment.deletePayment(id);
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  updatePayment,
  getLatestPayment,
  deletePayment
};
