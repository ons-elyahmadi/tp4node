const Product = require('../Model/productModel');
const Category = require('../Model/categoryModel');

const addProductToCategory = async (req, res, next) => {
  try {
    const { name, price, description, categoryId } = req.body;
    const category = await Category.findById(categoryId);
    if (!category) {
      return res.status(404).send({ message: 'Category not found' });
    }
    const product = new Product({ name, price, description, category: categoryId });
    await product.save();
    category.products.push(product._id);
    await category.save();
    res.status(201).send(product);
  } catch (error) {
    next(error);
  }
};

const updateProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const { name, price, description } = req.body;
    const product = await Product.findByIdAndUpdate(productId, { name, price, description }, { new: true });
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.status(200).send(product);
  } catch (error) {
    next(error);
  }
};

const deleteProduct = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const product = await Product.findByIdAndDelete(productId);
    if (!product) {
      return res.status(404).send({ message: 'Product not found' });
    }
    res.status(200).send({ message: 'Product deleted successfully' });
  } catch (error) {
    next(error);
  }
};

const getAllProductsWithCategories = async (req, res, next) => {
  try {
    const products = await Product.find().populate('category');
    res.status(200).send(products);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  addProductToCategory,
  updateProduct,
  deleteProduct,
  getAllProductsWithCategories,
};
