const db = require("../config/db");

// ✅ Create Payment
const createPayment = async (user_id, amount, payment_status, payment_method, transaction_id) => {
  const query = `
    INSERT INTO payments (user_id, amount, payment_status, payment_method, transaction_id) 
    VALUES (?, ?, ?, ?, ?)
  `;
  const [result] = await db.execute(query, [user_id, amount, payment_status, payment_method, transaction_id]);
  return result.insertId; // Return newly created payment ID
};

// ✅ Get All Payments
const getAllPayments = async () => {
  const query = `SELECT * FROM payments`;
  const [payments] = await db.execute(query);
  return payments;
};

// ✅ Get Payment by ID
const getPaymentById = async (id) => {
  const query = `SELECT * FROM payments WHERE id = ?`;
  const [result] = await db.execute(query, [id]);
  return result[0]; // Single record or undefined
};

// ✅ Update Payment
const updatePayment = async (id, amount, payment_status, payment_method) => {
  const query = `
    UPDATE payments 
    SET amount = ?, payment_status = ?, payment_method = ?
    WHERE id = ?
  `;
  const [result] = await db.execute(query, [amount, payment_status, payment_method, id]);
  return result.affectedRows; // Return affected rows count
};

// ✅ Delete Payment
const deletePayment = async (id) => {
  const query = `DELETE FROM payments WHERE id = ?`;
  const [result] = await db.execute(query, [id]);
  return result.affectedRows;
};

const getLatestPayment = async (user_id) => {
  const query = `
    SELECT * FROM payments
    WHERE user_id = ?
    ORDER BY created_at DESC
    LIMIT 1
  `;
  const [result] = await db.execute(query, [user_id]);
  return result[0]; // Return single record or undefined
};

module.exports = {
  createPayment,
  getAllPayments,
  getLatestPayment,
  getPaymentById,
  updatePayment,
  deletePayment
};
