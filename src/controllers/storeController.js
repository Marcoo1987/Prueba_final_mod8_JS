const { Category, Product } = require('../models');
const catchAsync = require('../utils/catchAsync');

exports.getAllCategories = catchAsync(async (req, res) => {
    const categories = await Category.findAll();
    res.json({ status: 'success', data: categories });
});

exports.createCategory = catchAsync(async (req, res) => {
    const { name, description } = req.body;
    const newCategory = await Category.create({ name, description });
    res.status(201).json({ status: 'success', data: newCategory });
});

exports.getAllProducts = catchAsync(async (req, res) => {
    const { search, category } = req.query;
    let whereClause = {};
    if (search) {
        whereClause.name = { [require('sequelize').Op.iLike]: `%${search}%` };
    }
    if (category) {
        whereClause.categoryId = category;
    }
    const products = await Product.findAll({
        where: whereClause,
        include: [{ model: Category, attributes: ['id', 'name'] }]
    });
    res.json({ status: 'success', data: products });
});

exports.getProductById = catchAsync(async (req, res) => {
    const product = await Product.findByPk(req.params.id, {
        include: [{ model: Category, attributes: ['id', 'name'] }]
    });
    if (!product) return res.status(404).json({ status: 'fail', message: 'Product not found' });
    res.json({ status: 'success', data: product });
});

exports.createProduct = catchAsync(async (req, res) => {
    const { name, description, price, stock, categoryId, imageUrl } = req.body;
    const newProduct = await Product.create({ name, description, price, stock, categoryId, imageUrl });
    res.status(201).json({ status: 'success', data: newProduct });
});

exports.updateProduct = catchAsync(async (req, res) => {
    const { name, description, price, stock, categoryId, imageUrl } = req.body;
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ status: 'fail', message: 'Product not found' });
    await product.update({ name, description, price, stock, categoryId, imageUrl });
    res.json({ status: 'success', data: product });
});

exports.deleteProduct = catchAsync(async (req, res) => {
    const product = await Product.findByPk(req.params.id);
    if (!product) return res.status(404).json({ status: 'fail', message: 'Product not found' });
    await product.destroy();
    res.json({ status: 'success', message: 'Product deleted' });
});
