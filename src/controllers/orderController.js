const orderService = require("../services/orderService");

/**
 * ✅ Create Order
 */
const createOrder = async (req, res) => {
  try {
    const { total_price, products } = req.body;
    const userId = req.user.id;

    if (!total_price || !products || products.length === 0) {
      return res.status(400).json({ message: "Total price and products are required" });
    }

    const orderId = await orderService.createOrder(userId, total_price, products);

    res.status(201).json({ message: "Order created successfully", orderId });
  } catch (error) {
    console.error("Error creating order:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

/**
 * ✅ Add Tracking Update
 */
const addTrackingUpdate = async (req, res) => {
  try {
    const { status, notes } = req.body;
    const { id: orderId } = req.params;

    await orderService.addTrackingUpdate(orderId, status, notes);

    res.status(200).json({ message: "Tracking updated successfully" });
  } catch (error) {
    console.error("Error adding tracking update:", error);
    res.status(500).json({ message: "Error adding tracking update", error: error.message });
  }
};

/**
 * ✅ Get Order Tracking
 */
const getOrderTracking = async (req, res) => {
  try {
    const { id: orderId } = req.params;
    const tracking = await orderService.getOrderTracking(orderId);

    res.status(200).json(tracking);
  } catch (error) {
    console.error("Error fetching order tracking:", error);
    res.status(500).json({ message: "Error fetching order tracking", error: error.message });
  }
};



module.exports = { createOrder, addTrackingUpdate, getOrderTracking };
