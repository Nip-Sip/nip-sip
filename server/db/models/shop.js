const Sequelize = require('sequelize')
const db = require('../db')

const Shop = db.define('shop', {
  shop_name: { type: Sequelize.STRING, allowNull: false },
  days_opened: { type: Sequelize.INTEGER },
  status: { type: Sequelize.ENUM('Newbie', 'Trusted', 'Power Seller') }
})

module.exports = Shop
