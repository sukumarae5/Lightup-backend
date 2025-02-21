const connection= require('../config/db');  // Your MySQL database connection

// Add a new product
const createProduct = async (productData) => {
  
  try {
    const categoryCheckQuery = `SELECT id FROM categories WHERE id = ?`;
    const [category] = await connection.execute(categoryCheckQuery,[productData.category_id])
    if(category.length === 0){
      throw new Error("category id does not exist");
    }
   
    const query = `
      INSERT INTO products (name, description, price, stock, image_url, category_id)
      VALUES (?, ?, ?, ?, ?, ?)
    `;
    const values = [productData.name, productData.description, productData.price, productData.stock, productData.image_url, productData.category_id];
    const [result] = await connection.execute(query, values);
    return result.insertId;  // Return the inserted product's ID
  } catch (error) {
    if(error.message.includes('Caegory ID')){
      return res.status(400).json({error: error.message})
    }
    console.error('error during product regisration',error.message)
    throw new Error('Error creating product: ' + error.message);
    
  }
};

// Get all products
const getAllProducts = async () => {
  try {
    const query = 'SELECT * FROM products';
    const [rows] = await connection.execute(query);
    return rows;  // Return all products
  } catch (error) {
    throw new Error('Error fetching products: ' + error.message);
  }
};

const updateProduct = async (productId, productData) => {
  try {
      const query = `
          UPDATE products 
          SET name = ?, description = ?, price = ?, stock = ?, image_url = ?, category_id = ?
          WHERE id = ?
      `;

      if (!productId) {
          throw new Error('Product ID is required.');
      }

      const values = [
          productData.name || null,
          productData.description || null,
          productData.price || null,
          productData.stock || null,
          productData.image_url || null,
          productData.category_id || null,
          productId
      ];

      const [results] = await connection.execute(query, values);

      if (results.affectedRows === 0) {
          throw new Error('Product not found or no changes made.');
      }

      return results;
  } catch (error) {
      console.error('Error updating product:', error.message);
      throw new Error('Error updating product: ' + error.message);
  }
};

// **Delete Product**
const deleteProduct = async (productId) => {
  try {
      const query = `DELETE FROM products WHERE id = ?`;

      const [results] = await connection.execute(query, [productId]);

      if (results.affectedRows === 0) {
          throw new Error('Product not found.');
      }

      return results;
  } catch (error) {
      console.error('Error deleting product:', error.message);
      throw new Error('Error deleting product: ' + error.message);
  }
};

module.exports = {
  createProduct,
  getAllProducts,
  updateProduct,
  deleteProduct,
};

