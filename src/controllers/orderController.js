const orderService = require('../services/orderService');

exports.registerOrders = async (req, res) => {
  const { user_id, total_price, status } = req.body;

  // Allowed status values
  const allowedStatusValues = ['pending', 'completed', 'cancelled'];

  // Validate required fields
  if (!user_id || !total_price || !status) {
    return res.status(400).json({
      error: 'Validation error: All fields (user_id, total_price, status) are required.',
    });
  }

  // Validate status
  if (!allowedStatusValues.includes(status)) {
    return res.status(400).json({
      error: `Invalid status. Allowed values are: ${allowedStatusValues.join(', ')}.`,
    });
  }

  try {
    const orderId = await orderService.registerOrders({
      user_id,
      total_price,
      status,
    });

    res.status(201).json({
      message: 'Order registered successfully',
      orderId,
    });
  } catch (error) {
    console.error('Error during order registration:', error.message);

    // Handle specific MySQL foreign key constraint error
    if (error.message.includes('a foreign key constraint fails')) {
      return res.status(400).json({
        error: 'Order user ID not found or not available. Please provide a valid user ID.',
      });
    }

    // General error response
    res.status(500).json({
      error: 'Server error: Unable to register order. Please try again later.',
    });
  }
};

exports.getAllOrders = async (req, res) => {
  try {
    const orders = await orderService.fetchAllOrders();

    if (orders.length === 0) {
      return res.status(404).json({
        message: 'No orders found.',
      });
    }

    res.status(200).json({
      orders,
    });
  } catch (error) {
    console.error('Error fetching orders:', error.message);

    res.status(500).json({
      error: 'Server error: Unable to fetch orders. Please try again later.',
    });
  }
};
