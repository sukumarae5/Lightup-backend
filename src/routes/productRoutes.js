const express = require('express');
const { registerProducts, getAllProducts, updateProduct, deleteProduct } = require('../controllers/productController');

const router = express.Router();

router.post('/productregister', registerProducts);
router.get('/allproducts', getAllProducts);
router.put('/updateproduct/:id', updateProduct); // Update product
router.delete('/deleteproduct/:id', deleteProduct); // Delete product

module.exports = router;
