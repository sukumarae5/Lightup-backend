const orderService = require('../services/orderService');

const createOrder = async (req, res) => {
  const { userId, totalPrice, status, addressId, items } = req.body;
  console.log(req.body);

  // Validate required fields
  if (!userId || !totalPrice || !status || !addressId || !items || !items.length) {
    return res.status(400).json({ message: 'Required fields: userId, totalPrice, status, addressId, and items' });
  }

  // Validate status (convert first letter to uppercase)
  const allowedStatuses = ['Pending', 'Processing','confirmed', 'Shipped', 'Delivered', 'Cancelled', 'Returned'];
  const formattedStatus = status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  if (!allowedStatuses.includes(formattedStatus)) {
    return res.status(400).json({ message: 'Invalid order status.' });
  }

  try {
    const orderId = await orderService.createOrder(userId, totalPrice, formattedStatus, addressId, items);
    res.status(201).json({ message: 'Order created successfully', orderId });
  } catch (error) {
    console.error('Error creating order:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
}

const getOrdersByUser = async (req, res) => {
  try {
      const userId = req.params.userId;
      const orders = await Order.findAll({ where: { user_id: userId } });

      res.status(200).json({ success: true, orders });
  } catch (error) {
      res.status(500).json({ success: false, message: "Error fetching orders", error });
  }
};



const updateOrder = async (req, res) => {
  const { orderId, userId, totalPrice, status, addressId } = req.body;

  if (!orderId || !userId || !totalPrice || !status || !addressId) {
    return res.status(400).json({ message: 'All fields are required (orderId, userId, totalPrice, status, addressId)' });
  }

  try {
    const updatedRows = await orderService.updateOrder(orderId, userId, totalPrice, status, addressId);
    if (updatedRows === 0) {
      return res.status(404).json({ message: 'Order not found or unauthorized' });
    }
    res.status(200).json({ message: 'Order updated successfully' });
  } catch (error) {
    console.error('Error updating order:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const deleteOrder = async (req, res) => {
  const { orderId, userId } = req.body;

  if (!orderId || !userId) {
    return res.status(400).json({ message: 'orderId and userId are required' });
  }

  try {
    const deletedRows = await orderService.deleteOrder(orderId, userId);
    if (deletedRows === 0) {
      return res.status(404).json({ message: 'Order not found or unauthorized' });
    }
    res.status(200).json({ message: 'Order deleted successfully' });
  } catch (error) {
    console.error('Error deleting order:', error);
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

const getAllOrders=async (req, res) => {
  try {
    const orders=await orderService.getAllOrders();
    res.status(200).json({ success: true, data: orders });
  } catch (error) {
    console.error("Error fetching orders:", error.message);
        res.status(500).json({ success: false, message: "Error fetching orders", error: error.message });
  }
}

module.exports = { createOrder, getAllOrders, getOrdersByUser, updateOrder, deleteOrder };
