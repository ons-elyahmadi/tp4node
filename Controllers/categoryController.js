const Category = require('../Model/categoryModel');

const createCategory = async (req, res, next) => {
  try {
    const { name, description } = req.body;
    const category = new Category({ name, description });
    await category.save();
    res.status(201).send(category);
  } catch (error) {
    next(error);
  }
};

const updateCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const { name, description } = req.body;
    const category = await Category.findByIdAndUpdate(categoryId, { name, description }, { new: true });
    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }
    res.status(200).send(category);
  } catch (error) {
    next(error);
  }
};

const deleteCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const category = await Category.findByIdAndDelete(categoryId);
    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }
    res.status(200).send({ message: 'Category deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const getAllCategoriesWithProducts = async (req, res, next) => {
  try {
    const categories = await Category.find().populate('products');
    res.status(200).send(categories);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getAllCategoriesWithProducts,
};
