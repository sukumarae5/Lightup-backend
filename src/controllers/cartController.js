const cartService = require("../services/cartService");

// ✅ Fetch all cart items (For Admins)
const getAllCartItems = async (req, res) => {
  try {
    const cartItems = await cartService.getAllCartItems();
    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error retrieving cart items:", error);
    res.status(500).json({ message: "Error retrieving cart items", error: error.message });
  }
};

// ✅ Add a new cart item
const addCartItem = async (req, res) => {
  try {
    console.log("req body", req.body);
    const { user_id, product_id, quantity } = req.body;

    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: "Invalid JSON format" });
    }

    if (!user_id || !product_id || !quantity) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const cartData = { user_id, product_id, quantity };
    const cartItem = await cartService.addCartItem(cartData); // Call service instead of model

    res.status(200).json({ message: "Cart item added", cartData }); // Send full object
  } catch (error) {
    console.error("Error adding cart item:", error);
    res.status(500).json({ message: "Error adding cart item" });
  }
};

// ✅ Get user-specific cart items
const getCartItems = async (req, res) => {
  try {
    const userId = req.user.id; // Extract user ID from token
    console.log("Authenticated User ID:", userId);
    const cartItems = await cartService.getCartItemsByUser(userId);
    res.status(200).json(cartItems);
  } catch (error) {
    console.error("Error retrieving cart items:", error);
    res.status(500).json({ message: "Error retrieving cart items", error: error.message });
  }
};

// ✅ Update a cart item
const updateCartItem = async (req, res) => {
  try {
    console.log("Received request body:", req.body);
    console.log("Received request params:", req.params);

    const { id } = req.params; // Extract cart item ID from URL
    const { quantity } = req.body; // Extract quantity from request body
    const userId = req.user.id; // Extract user ID from authentication middleware

    console.log("Request Data - CartItemId:", id, "UserId:", userId, "Quantity:", quantity);

    // Validate parameters
    if (!id || quantity === undefined || isNaN(quantity) || quantity < 1) {
      return res.status(400).json({ message: "CartItemId and valid quantity are required" });
    }

    // Call service to update cart item
    const updatedCart = await cartService.updateCartItem(id, userId, quantity);
    res.status(200).json({ message: "Cart item updated successfully", updatedCart });

  } catch (error) {
    console.error("Error updating cart item:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};




// ✅ Delete a cart item
const deleteCartItem = async (req, res) => {
  try {
    const cartId = req.params.id;
    const deleted = await cartService.deleteCartItem(cartId, req.user.id);
    if (deleted) {
      res.status(200).json({ message: "Cart item deleted" });
    } else {
      res.status(404).json({ message: "Cart item not found" });
    }
  } catch (error) {
    console.error("Error deleting cart item:", error);
    res.status(500).json({ message: "Error deleting cart item", error: error.message });
  }
};

// ✅ Export controllers
module.exports = {
  getAllCartItems,
  addCartItem,
  getCartItems,
  updateCartItem,
  deleteCartItem,
};
