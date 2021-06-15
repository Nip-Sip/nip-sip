const Sequelize = require('sequelize')
const db = require('../db')

const Product = db.define('product', {
  name: {
    type:Sequelize.STRING,
    allowNull: false,
  },
  price: {
    type: Sequelize.INTEGER
  },
  imageUrl: {
    type: Sequelize.STRING
  }
})

module.exports = Product
