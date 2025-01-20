const connection=require('../config/db')

const createOrder = async (orderData) => {
    try {
      // Validate user_id exists
      const userCheckQuery = `SELECT id FROM users WHERE id = ?`;
      const [user] = await connection.execute(userCheckQuery, [orderData.user_id]);
      if (user.length === 0) {
        throw new Error('User ID does not exist.');
      }
  
      // Validate total_price is positive
      if (orderData.total_price <= 0) {
        throw new Error('Total price must be a positive value.');
      }
  
      // Validate status is valid
      const validStatuses = ['pending', 'completed', 'cancelled'];
      if (!validStatuses.includes(orderData.status)) {
        throw new Error(`Invalid status. Allowed values are: ${validStatuses.join(', ')}.`);
      }
  
      // Insert the order
      const query = `INSERT INTO orders (user_id, total_price, status) VALUES (?, ?, ?)`;
      const values = [orderData.user_id, orderData.total_price, orderData.status];
      const [result] = await connection.execute(query, values);
      return result.insertId; // Return the inserted order's ID
    } catch (error) {
      console.error('Error during order creation:', error.message);
      throw new Error('Error creating order: ' + error.message);
    }
  };
  

const getAllOrders = async () => {
    const query ='SELECT * FROM orders';
    const [results] = await connection.execute(query)
    return results

}

module.exports={
    createOrder,
    getAllOrders
}