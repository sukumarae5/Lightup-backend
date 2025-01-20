const express = require('express')
const {registerProducts, getAllProducts}=require('../controllers/productController')

const router= express.Router();

router.post('/productregister', registerProducts);
router.get('/allproducts', getAllProducts);

module.exports=router;
