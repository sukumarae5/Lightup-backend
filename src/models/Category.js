const connection = require('../config/db');

// Get All Categories
const getAllCategories = async () => {
    const [rows] = await connection.execute('SELECT * FROM categories');
    return rows;
};

// Get Category By ID
const getCategoryById = async (id) => {
    const [rows] = await connection.execute('SELECT * FROM categories WHERE id = ?', [id]);
    return rows.length > 0 ? rows[0] : null;
};

// Create Category with Image
const createCategory = async (categoryData) => {
    const query = 'INSERT INTO categories (name, image) VALUES (?, ?)';
    const values = [categoryData.name, categoryData.image];
    const [results] = await connection.execute(query, values);
    return results.insertId;
};

// Update Category with Image
const updateCategory = async (id, categoryData) => {
    const query = categoryData.image 
        ? 'UPDATE categories SET name = ?, image = ? WHERE id = ?' 
        : 'UPDATE categories SET name = ? WHERE id = ?';

    const values = categoryData.image 
        ? [categoryData.name, categoryData.image, id] 
        : [categoryData.name, id];

    const [results] = await connection.execute(query, values);
    return results.affectedRows > 0;
};

// Delete Category
const deleteCategory = async (id) => {
    const query = 'DELETE FROM categories WHERE id = ?';
    const [results] = await connection.execute(query, [id]);
    return results.affectedRows > 0;
};

module.exports = {
    getAllCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
};
