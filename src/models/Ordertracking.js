const connection = require("../config/db");

/**
 * ✅ Add Tracking Entry
 */
const addTrackingEntry = async (orderId, status, notes) => {
  const query = `
    INSERT INTO order_tracking (order_id, status, notes)
    VALUES (?, ?, ?)
  `;
  const [result] = await connection.execute(query, [orderId, status, notes]);
  return result.insertId;
};

/**
 * ✅ Get Order Tracking by Order ID
 */
const getOrderTracking = async (orderId) => {
  const query = "SELECT * FROM order_tracking WHERE order_id = ? ORDER BY updated_at DESC";
  const [results] = await connection.execute(query, [orderId]);
  return results;
};

/**
 * ✅ Update Order Tracking Entry
 */
const updateOrderTracking = async (trackingId, status, notes) => {
  const query = `
    UPDATE order_tracking
    SET status = ?, notes = ?, updated_at = CURRENT_TIMESTAMP
    WHERE id = ?
  `;
  const [result] = await connection.execute(query, [status, notes, trackingId]);
  return result.affectedRows > 0;
};

/**
 * ✅ Delete an Order Tracking Entry
 */
const deleteOrderTracking = async (trackingId) => {
  const query = "DELETE FROM order_tracking WHERE id = ?";
  const [result] = await connection.execute(query, [trackingId]);
  return result.affectedRows > 0;
};

module.exports = { addTrackingEntry, getOrderTracking, updateOrderTracking, deleteOrderTracking };
