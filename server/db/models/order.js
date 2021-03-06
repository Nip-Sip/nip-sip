const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('order', {
  date: { type: Sequelize.DATE, defaultValue: db.fn('NOW') },
  address: Sequelize.STRING,
  price: { type: Sequelize.INTEGER, allowNull: false },
  promo: Sequelize.STRING
})

module.exports = Order
