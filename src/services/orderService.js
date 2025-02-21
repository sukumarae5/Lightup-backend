const orderModel = require("../models/Order");
const orderItemModel = require("../models/Orderitem");
const orderTrackingModel = require("../models/Ordertracking");

/**
 * ✅ Create an Order
 */
const createOrder = async (userId, totalPrice, products) => {
  const trackingNumber = generateTrackingNumber();
  const courier = "Courier XYZ";  // Example: You can dynamically assign courier based on user or shipping method
  const estimatedDeliveryDate = calculateEstimatedDeliveryDate();

  // Create the order
  const orderId = await orderModel.createOrder(userId, totalPrice, trackingNumber, courier, estimatedDeliveryDate);

  // Add items to the order
  for (let product of products) {
    await orderItemModel.addItemsToOrder(orderId, product.productId, product.quantity, product.price);
  }

  // Add an initial tracking entry
  await orderTrackingModel.addTrackingEntry(orderId, "Order Created", "Order placed and awaiting shipment");

  return orderId;
};

/**
 * ✅ Generate a Tracking Number
 */
const generateTrackingNumber = () => {
  return "TRK-" + Math.random().toString(36).substring(2, 10).toUpperCase();
};

/**
 * ✅ Calculate Estimated Delivery Date (e.g., 5 days from order creation)
 */
const calculateEstimatedDeliveryDate = () => {
  const currentDate = new Date();
  currentDate.setDate(currentDate.getDate() + 5); // 5 days later
  return currentDate.toISOString().split('T')[0]; // Return date in YYYY-MM-DD format
};

/**
 * ✅ Add Tracking Update
 */
const addTrackingUpdate = async (orderId, status, notes) => {
  return await orderTrackingModel.addTrackingEntry(orderId, status, notes);
};

/**
 * ✅ Get Order Tracking
 */
const getOrderTracking = async (orderId) => {
  return await orderTrackingModel.getOrderTracking(orderId);
};

const updateOrder = async (orderId, totalPrice, status, trackingNumber, courier, estimatedDeliveryDate) => {
  // First, update the order itself
  const isUpdated = await orderModel.updateOrder(orderId, totalPrice, status, trackingNumber, courier, estimatedDeliveryDate);
  
  if (!isUpdated) {
    throw new Error("Failed to update the order.");
  }

  return { message: "Order updated successfully" };
};

/**
 * ✅ Delete an Order
 */
const deleteOrder = async (orderId) => {
  // Delete order items and tracking entries
  const isDeleted = await orderModel.deleteOrder(orderId);

  if (!isDeleted) {
    throw new Error("Failed to delete the order.");
  }

  return { message: "Order and related items deleted successfully" };
};

/**
 * ✅ Update an Order Item
 */
const updateOrderItem = async (orderItemId, quantity, price) => {
  const isUpdated = await orderItemModel.updateOrderItem(orderItemId, quantity, price);
  if (!isUpdated) {
    throw new Error("Failed to update the order item.");
  }
  return { message: "Order item updated successfully" };
};

/**
 * ✅ Delete an Order Item
 */
const deleteOrderItem = async (orderItemId) => {
  const isDeleted = await orderItemModel.deleteOrderItem(orderItemId);
  if (!isDeleted) {
    throw new Error("Failed to delete the order item.");
  }
  return { message: "Order item deleted successfully" };
};

/**
 * ✅ Update an Order Tracking Entry
 */
const updateOrderTracking = async (trackingId, status, notes) => {
  const isUpdated = await orderTrackingModel.updateOrderTracking(trackingId, status, notes);
  if (!isUpdated) {
    throw new Error("Failed to update the tracking entry.");
  }
  return { message: "Tracking entry updated successfully" };
};

/**
 * ✅ Delete an Order Tracking Entry
 */
const deleteOrderTracking = async (trackingId) => {
  const isDeleted = await orderTrackingModel.deleteOrderTracking(trackingId);
  if (!isDeleted) {
    throw new Error("Failed to delete the tracking entry.");
  }
  return { message: "Tracking entry deleted successfully" };
};

module.exports = {
  updateOrder,
  deleteOrder,
  updateOrderItem,
  deleteOrderItem,
  updateOrderTracking,
  deleteOrderTracking,
};
module.exports = { createOrder, addTrackingUpdate, getOrderTracking };
