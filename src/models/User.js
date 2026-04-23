const { DataTypes } = require('sequelize');
const { sequelize } = require('../config/database');
const User = sequelize.define('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  role: {
    type: DataTypes.ENUM('admin', 'customer'),
    defaultValue: 'customer',
  },
}, {
  timestamps: true,
  hooks: {
    beforeCreate: async (user) => {
      if (user.password) {
        const salt = await require('bcryptjs').genSalt(10);
        user.password = await require('bcryptjs').hash(user.password, salt);
      }
    },
    beforeUpdate: async (user) => {
      if (user.changed('password')) {
        const salt = await require('bcryptjs').genSalt(10);
        user.password = await require('bcryptjs').hash(user.password, salt);
      }
    }
  }
});
User.prototype.validatePassword = async function (password) {
  return await require('bcryptjs').compare(password, this.password);
};
module.exports = User;
