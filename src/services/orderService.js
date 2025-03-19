const Order = require('../models/Order');

const createOrder = async (userId, totalPrice, status, addressId, items) => {
  // Create the order first and get the generated orderId
  const orderId = await Order.createOrder(userId, totalPrice, status, addressId);
  // Insert order items using the orderId
  await Order.createOrderItems(orderId, items);
  return orderId;
};


const getOrdersByUser = async (userId) => {
  return await Order.getOrdersByUser(userId);
};

const getAllOrders= async () => {
  return await Order.getAllOrders()
}

const updateOrder = async (orderId, userId, totalPrice, status, addressId) => {
  return await Order.updateOrder(orderId, userId, totalPrice, status, addressId);
};

const deleteOrder = async (orderId, userId) => {
  return await Order.deleteOrder(orderId, userId);
};

module.exports = { createOrder,getAllOrders, getOrdersByUser, updateOrder, deleteOrder };
