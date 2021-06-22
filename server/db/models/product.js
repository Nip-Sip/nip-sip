const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type: Sequelize.STRING,
    unique: true,
    allowNull: false
  },
  price: {
    type: Sequelize.INTEGER
  },
  category: {
    type: Sequelize.ENUM('Whisky', 'Tequila', 'Vodka', 'Rum', 'Liqueur')
  },
  ABV: {
    type: Sequelize.DECIMAL(10, 1)
  },
  imageUrl: {
    type: Sequelize.STRING,
    defaultValue:
      'http://sc04.alicdn.com/kf/H4782b5739bcb4327a6a9f8cc7e1bccdbo.jpg'
  },
  description: {
    type: Sequelize.TEXT
    // allowNull: false,
  }
})

module.exports = Product
