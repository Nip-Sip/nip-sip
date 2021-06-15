const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define('cart_item', {
  quantity: Sequelize.INTEGER
})

module.exports = CartItem
