const cartModel = require("../models/Cart");

/**
 * ✅ Add an item to the cart
 * @param {Object} cartData - { user_id, product_id, quantity }
 * @returns {Promise<Object>} - The newly inserted cart item
 */
const addCartItem = async (cartData) => {
  return await cartModel.addCartItem(cartData); // Returns full cart item object
};

/**
 * ✅ Get cart items for a specific user
 * @param {number} userId - User's ID
 * @returns {Promise<Array>} - List of cart items
 */
const getCartItemsByUser = async (userId) => {
  return await cartModel.getCartItemsByUser(userId);
};

/**
 * ✅ Update a cart item (quantity)
 * @param {number} cartId - Cart item ID
 * @param {Object} cartData - { quantity }
 * @returns {Promise<boolean>} - True if updated, false otherwise
 */
const updateCartItem = async (cartId, userId, quantity) => {
  try {
    console.log("Updating Cart Item - cartId:", cartId, "userId:", userId, "quantity:", quantity);
    if (!cartId || !userId || quantity === undefined || isNaN(quantity)) {
      console.error("Missing parameters in updateCartItem:", { cartId, userId, quantity });
      throw new Error("Missing required parameters for updating cart item.");
    }

    const result = await cartModel.updateCartItem(cartId, userId, quantity);
    return result;
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw error;
  }
};

/**
 * ✅ Delete a cart item
 * @param {number} cartId - Cart item ID
 * @param {number} userId - User ID (to prevent unauthorized deletion)
 * @returns {Promise<boolean>} - True if deleted, false otherwise
 */
const deleteCartItem = async (cartId, userId) => {
  return await cartModel.deleteCartItem(cartId, userId);
};

/**
 * ✅ Get all cart items (Admin use case)
 * @returns {Promise<Array>} - List of all cart items
 */
const getAllCartItems = async () => {
  return await cartModel.getAllCartItems();
};

// ✅ Export all functions for use in the controller
module.exports = {
  addCartItem,
  getCartItemsByUser,
  updateCartItem,
  deleteCartItem,
  getAllCartItems,
};
