const connection = require("../config/db");

/**
 * ✅ Add an item to the cart
 */
const addCartItem = async (cartData) => {
  const query = `
    INSERT INTO cart (user_id, product_id, quantity)
    VALUES (?, ?, ?)
  `;
  const values = [cartData.user_id, cartData.product_id, cartData.quantity];

  const [results] = await connection.execute(query, values);
  return results.insertId;
};

/**
 * ✅ Get cart items for a specific user
 */
const getCartItemsByUser = async (userId) => {
  const query = "SELECT * FROM cart WHERE user_id = ?";
  const [results] = await connection.execute(query, [userId]);
  return results;
};

/**
 * ✅ Update cart item quantity
 */
const pool = require("../config/db");

const updateCartItem = async (cartItemId, userId, quantity) => {
  let connection;
  try {
    console.log("Executing SQL Query - cartItemId:", cartItemId, "userId:", userId, "quantity:", quantity);

    if (!cartItemId || !userId || quantity === undefined || isNaN(quantity)) {
      throw new Error("Missing required parameters for updating cart item.");
    }

    // Get a database connection
    connection = await pool.getConnection();

    // Execute the update query
    const query = "UPDATE cart SET quantity = ? WHERE id = ? AND user_id = ?";
    const [result] = await connection.execute(query, [quantity, cartItemId, userId]);

    if (result.affectedRows === 0) {
      throw new Error("Cart item not found or unauthorized.");
    }

    return { success: true, message: "Cart item updated successfully." };
  } catch (error) {
    console.error("Error updating cart item:", error);
    throw error;
  } finally {
    if (connection) connection.release(); // Release connection to pool
  }
};

module.exports = { updateCartItem };



/**
 * ✅ Delete a cart item
 */
const deleteCartItem = async (cartId, userId) => {
  const query = "DELETE FROM cart WHERE id = ? AND user_id = ?";
  const [results] = await connection.execute(query, [cartId, userId]);
  return results.affectedRows > 0; // Returns true if deletion was successful
};

/**
 * ✅ Get all cart items (For Admins)
 */
const getAllCartItems = async () => {
  const query = "SELECT * FROM cart";
  const [results] = await connection.execute(query);
  return results;
};

// Export the model functions
module.exports = { addCartItem, getCartItemsByUser, updateCartItem, deleteCartItem, getAllCartItems };
