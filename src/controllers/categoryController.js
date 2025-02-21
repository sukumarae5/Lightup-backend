const categoryService = require('../services/categoryService');

exports.getAllCategories = async (req, res) => {
    try {
        const categories = await categoryService.getAllCategories();
        res.json(categories);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

exports.getCategoryById = async (req, res) => {
    try {
        const category = await categoryService.getCategoryById(req.params.id);
        if (!category) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json(category);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Register New Category with Image
exports.registerCategory = async (req, res) => {
    const { name } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!name || !image) {
        return res.status(400).json({ error: 'Category name and image are required' });
    }

    try {
        const categoryId = await categoryService.createCategory({ name, image });
        res.status(201).json({ message: 'Category created successfully', id: categoryId });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Update Category with Image
exports.updateCategory = async (req, res) => {
    const { name } = req.body;
    const image = req.file ? req.file.filename : null;

    if (!name) {
        return res.status(400).json({ error: 'Category name is required' });
    }

    try {
        const updated = await categoryService.updateCategory(req.params.id, { name, image });
        if (!updated) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json({ message: 'Category updated successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};

// Delete Category
exports.deleteCategory = async (req, res) => {
    try {
        const deleted = await categoryService.deleteCategory(req.params.id);
        if (!deleted) {
            return res.status(404).json({ error: 'Category not found' });
        }
        res.json({ message: 'Category deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
