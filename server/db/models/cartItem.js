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
  },
  orderedBy: {
    type: Sequelize.INTEGER
  }
})

CartItem.createOrUpdate = async function (userId, product) {
  const inCart = product.cartItem.inCart ? product.cartItem.inCart : false
  const [newOrUpdatedProduct, isCreated] = await CartItem.findOrCreate({
    where: { userId: userId, productId: product.id, orderId: null}
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

CartItem.addOrderNumber = function (orderId, cart) {

  cart.forEach(async (item) => {
    let cartItemId = item.cartItem.id
    let userId = item.cartItem.userId
    console.log(typeof userId)
    let cartItem = await CartItem.findByPk(cartItemId)
    await cartItem.update({userId: null, orderedBy: userId, orderId: orderId})
  })
}

CartItem.createCartItemsAndAttachOrder = async function (cartItems, orderId) {
  cartItems.forEach(async (cartItem) => {
    await CartItem.create({productId: cartItem.id, quantity: cartItem.cartItem.quantity, orderId: orderId})
  })
}

module.exports = CartItem
