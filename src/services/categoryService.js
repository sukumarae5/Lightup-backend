const categoryModel = require('../models/Category');

exports.getAllCategories = async () => {
    return await categoryModel.getAllCategories();
};

exports.getCategoryById = async (id) => {
    return await categoryModel.getCategoryById(id);
};

exports.createCategory = async (categoryData) => {
    return await categoryModel.createCategory(categoryData);
};

exports.updateCategory = async (id, categoryData) => {
    return await categoryModel.updateCategory(id, categoryData);
};

exports.deleteCategory = async (id) => {
    return await categoryModel.deleteCategory(id);
};
