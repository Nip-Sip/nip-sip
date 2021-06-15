const Sequelize = require('sequelize')
const db = require('../db')

const Cart = db.define('cart', {
  name: Sequelize.STRING
})

module.exports = Cart
