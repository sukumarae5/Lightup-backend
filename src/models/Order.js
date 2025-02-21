const connection = require("../config/db");

/**
 * ✅ Create an Order
 */
const createOrder = async (userId, totalPrice, trackingNumber, courier, estimatedDeliveryDate) => {
  const query = `
    INSERT INTO orders (user_id, total_price, tracking_number, courier, estimated_delivery_date)
    VALUES (?, ?, ?, ?, ?)
  `;
  const [result] = await connection.execute(query, [userId, totalPrice, trackingNumber, courier, estimatedDeliveryDate]);
  return result.insertId;
};

/**
 * ✅ Get Order by ID
 */
const getOrderById = async (orderId) => {
  const query = "SELECT * FROM orders WHERE id = ?";
  const [results] = await connection.execute(query, [orderId]);
  return results.length > 0 ? results[0] : null;
};

/**
 * ✅ Get Order Items by Order ID
 */
const getOrderItemsByOrderId = async (orderId) => {
  const query = "SELECT * FROM order_items WHERE order_id = ?";
  const [results] = await connection.execute(query, [orderId]);
  return results;
};

/**
 * ✅ Update Order
 */
const updateOrder = async (orderId, totalPrice, status, trackingNumber, courier, estimatedDeliveryDate) => {
  const query = `
    UPDATE orders
    SET total_price = ?, status = ?, tracking_number = ?, courier = ?, estimated_delivery_date = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;
  const [result] = await connection.execute(query, [totalPrice, status, trackingNumber, courier, estimatedDeliveryDate, orderId]);
  return result.affectedRows > 0;
};

/**
 * ✅ Delete an Order
 */
const deleteOrder = async (orderId) => {
  // Delete related order items and tracking first to maintain referential integrity
  await connection.execute("DELETE FROM order_items WHERE order_id = ?", [orderId]);
  await connection.execute("DELETE FROM order_tracking WHERE order_id = ?", [orderId]);

  // Now, delete the order itself
  const query = "DELETE FROM orders WHERE id = ?";
  const [result] = await connection.execute(query, [orderId]);
  return result.affectedRows > 0;
};

module.exports = { createOrder, getOrderById, getOrderItemsByOrderId, updateOrder, deleteOrder };
