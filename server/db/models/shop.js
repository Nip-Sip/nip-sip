const Sequelize = require('sequelize')
const db = require('../db')

const Shop = db.define('shop', {
  shop_name: { type: Sequelize.STRING, allowNull: false },
  shop_opened: { type: Sequelize.DATE },
  status: { type: Sequelize.ENUM('Newbie', 'Trusted', 'Power Seller') }
})

module.exports = Shop
