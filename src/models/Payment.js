const db = require("../config/db");

const createPayment = async (paymentData) => {
  const query = `
    INSERT INTO payments (user_id, order_id, amount, payment_status, payment_method, transaction_id)
    VALUES (?, ?, ?, ?, ?, ?)
  `;
  const values = [
    paymentData.user_id,
    paymentData.order_id,
    paymentData.amount,
    paymentData.payment_status,
    paymentData.payment_method,
    paymentData.transaction_id,
  ];

  const [result] = await db.execute(query, values);
  return result.insertId;
};

const getAllPayments = async () => {
  const [rows] = await db.execute("SELECT * FROM payments ORDER BY created_at DESC");
  return rows;
};

const getPaymentById = async (paymentId) => {
  const query = "SELECT * FROM payments WHERE id = ?";
  const [rows] = await db.execute(query, [paymentId]);
  return rows[0];
};

const deletePayment = async (paymentId) => {
  const query = "DELETE FROM payments WHERE id = ?";
  const [result] = await db.execute(query, [paymentId]);
  return result;
};

module.exports = {
  createPayment,
  getAllPayments,
  getPaymentById,
  deletePayment,
};
