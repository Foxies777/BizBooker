const { DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Подключение к базе данных

const Booking = sequelize.define('Booking', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id',
    },
  },
  serviceId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Services',
      key: 'id',
    },
  },
  staffId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Users',
      key: 'id', // Убедитесь, что ключ совпадает с вашей таблицей Users
    },
  },
  businessId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'Businesses',
      key: 'id',
    },
  },
  startTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  endTime: {
    type: DataTypes.DATE,
    allowNull: false,
  },
  status: {
    type: DataTypes.ENUM('pending', 'confirmed', 'completed', 'canceled'),
    allowNull: false,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
}, {
  timestamps: true,
});

module.exports = Booking;
