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

const updateOrderItem = async (orderItemId, quantity, price) => {
    const query = `
      UPDATE order_items
      SET quantity = ?, price = ?, updated_at = CURRENT_TIMESTAMP
      WHERE id = ?
    `;
    const [result] = await connection.execute(query, [quantity, price, orderItemId]);
    return result.affectedRows > 0;
  };
  
  /**
   * ✅ Delete an Order Item
   */
  const deleteOrderItem = async (orderItemId) => {
    const query = "DELETE FROM order_items WHERE id = ?";
    const [result] = await connection.execute(query, [orderItemId]);
    return result.affectedRows > 0;
  };
  
  module.exports = { updateOrderItem, deleteOrderItem };

module.exports = { createOrder, getOrderById, getOrderItemsByOrderId };
