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
    type: Sequelize.STRING
  },
  description: {
    type: Sequelize.TEXT
    // allowNull: false,
  }
})

module.exports = Product
