const productModel = require('../models/Product');

const registerProduct = async (productData) => {
    return await productModel.createProduct(productData);
};

const fetchAllProducts = async () => {
    return await productModel.getAllProducts();
};

// **Update Product**
const updateProduct = async (productId, productData) => {
    return await productModel.updateProduct(productId, productData);
};

// **Delete Product**
const deleteProduct = async (productId) => {
    return await productModel.deleteProduct(productId);
};

module.exports = {
    registerProduct,
    fetchAllProducts,
    updateProduct,
    deleteProduct,
};
