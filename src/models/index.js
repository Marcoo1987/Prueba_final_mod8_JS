const { sequelize } = require('../config/database');
const User = require('./User');
const Category = require('./Category');
const Product = require('./Product');
Category.hasMany(Product, {
  foreignKey: 'categoryId',
  onDelete: 'SET NULL', 
});
Product.belongsTo(Category, {
  foreignKey: 'categoryId',
});
const initModels = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Database models synchronized successfully.');
  } catch (error) {
    console.error('Error synchronizing models:', error);
  }
};
module.exports = {
  sequelize,
  initModels,
  User,
  Category,
  Product,
};
