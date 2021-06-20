const Sequelize = require('sequelize')
const db = require('../db')

const Order = db.define('cartItem', {
  date: Sequelize.DATE,
  address: Sequelize.STRING,
  price: Sequelize.INTEGER,
  pricePaid: Sequelize.INTEGER
})

// Create, make sure

CartItem.createOrUpdate = async function (userId, product) {
  const inCart = product.cartItem.inCart ? product.cartItem.inCart : false
  const [newOrUpdatedProduct, isCreated] = await CartItem.findOrCreate({
    where: { userId: userId, productId: product.id }
  })

  if (isCreated || inCart) {
    newOrUpdatedProduct.quantity = product.cartItem.quantity
    await newOrUpdatedProduct.save()
  } else {
    newOrUpdatedProduct.quantity += product.cartItem.quantity
    await newOrUpdatedProduct.save()
  }

  return newOrUpdatedProduct
}

module.exports = Order
