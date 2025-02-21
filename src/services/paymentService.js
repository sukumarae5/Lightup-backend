const paymentModel = require("../models/Payment");

const addPayment = async (paymentData) => {
  return await paymentModel.createPayment(paymentData);
};

const fetchAllPayments = async () => {
  return await paymentModel.getAllPayments();
};

const fetchPaymentById = async (paymentId) => {
  return await paymentModel.getPaymentById(paymentId);
};

const removePayment = async (paymentId) => {
  return await paymentModel.deletePayment(paymentId);
};

module.exports = {
  addPayment,
  fetchAllPayments,
  fetchPaymentById,
  removePayment,
};
