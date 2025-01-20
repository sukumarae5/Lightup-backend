const productModel=require('../models/Product')

const registerProduct =async (productData) => {
    return await productModel.createProduct(productData)
}

const fetchAllProducts =async () => {
    return await productModel.getAllProducts();
}

module.exports={
    registerProduct,
    fetchAllProducts,
}