const Sequelize = require('sequelize')
const db = require('../db')

const CartItem = db.define('cartItem', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false
  },
  quantity: {
    type: Sequelize.INTEGER
  }
})

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

CartItem.addOrderNumber = async function (orderId, cart) {
  cart.forEach(async (item) => {
    let cartItemId = item.cartItem.id
    let cartItem = await CartItem.findByPk(cartItemId)
    cartItem.orderId = orderId
    await cartItem.save()
  })
}

module.exports = CartItem
