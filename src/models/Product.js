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

module.exports = {
  createProduct,
  getAllProducts
  
};
