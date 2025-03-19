const db = require('../config/db');

const createOrder = async (userId, totalPrice, status, addressId) => {
  const query = 'INSERT INTO orders (user_id, total_price, status, address_id) VALUES (?, ?, ?, ?)';
  const [result] = await db.execute(query, [userId, totalPrice, status, addressId]);
  return result.insertId;
};
const createOrderItems = async (orderId, items) => {
  // items is an array of objects with { product_id, quantity, price }
  const query = 'INSERT INTO order_items (order_id, product_id, quantity, price) VALUES ?';
  const values = items.map(item => [orderId, item.product_id, item.quantity, item.price]);
  const [result] = await db.query(query, [values]);
  return result;
};

const getOrdersByUser = async (userId) => {
  const query = 'SELECT * FROM orders WHERE user_id = ?';
  const [orders] = await db.execute(query, [userId]);
  return orders;

};

const getAllOrders = async () => {
    try {
        const [orders] = await db.execute("SELECT * FROM orders"); // Direct MySQL query
        return orders;
    } catch (error) {
        throw new Error(error.message);
    }
};


const updateOrder = async (orderId, userId, totalPrice, status, addressId) => {
  const query = 'UPDATE orders SET total_price = ?, status = ?, address_id = ? WHERE id = ? AND user_id = ?';
  const [result] = await db.execute(query, [totalPrice, status, addressId, orderId, userId]);
  return result.affectedRows;
};

const deleteOrder = async (orderId, userId) => {
  const query = 'DELETE FROM orders WHERE id = ? AND user_id = ?';
  const [result] = await db.execute(query, [orderId, userId]);
  return result.affectedRows;
};

module.exports = { createOrder, getOrdersByUser,getAllOrders, updateOrder, deleteOrder, createOrderItems };
