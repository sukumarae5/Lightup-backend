const express = require('express');
const upload = require('../middlewares/upload');
const { getAllCategories, getCategoryById, registerCategory, updateCategory, deleteCategory } = require('../controllers/categoryController');

const router = express.Router();

router.get('/categories', getAllCategories);
router.get('/categories/:id', getCategoryById);
router.post('/categories', upload.single('image'), registerCategory);
router.put('/categories/:id', upload.single('image'), updateCategory);
router.delete('/categories/:id', deleteCategory);

module.exports = router;
