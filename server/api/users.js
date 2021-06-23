const router = require('express').Router()
const { requireToken, requireAdminToken } = require('../auth/middleware')
const {
  models: { User, CartItem, Order }
} = require('../db')
module.exports = router

//GET /users/info :: getFavItem
router.get('/infos', requireToken, async (req, res, next) => {
  try {
    const { user } = req
    if (user) {
      console.log(`🟢  user.id `, user.id)
      const mostBought = await CartItem.findAll({
        where: { userId: user.id },
        order: [['quantity', 'DESC']]
      })
      console.log(`🟢  mostBought `, mostBought)
      res.json(mostBought[0])
    }
  } catch (err) {
    next(err)
  }
})

//GET /users
router.get('/', requireAdminToken, async (req, res, next) => {
  try {
    const { user } = req
    if (user) {
      const users = await User.findAll({
        attributes: [
          'id',
          'email',
          'createdAt',
          'isAdmin',
          'address',
          'zipcode',
          'firstName',
          'lastName'
        ]
      })
      res.json(users)
    }
  } catch (err) {
    next(err)
  }
})

//GET /users/cart
router.get('/cart', requireToken, async (req, res, next) => {
  try {
    const { id } = req.user
    const user = await User.findByPk(id)
    let products = await user.getProducts()
    products = products.filter((cartItem) => cartItem.cartItem.dataValues.orderId === null)
    res.json(products)
  } catch (error) {
    next(error)
  }
})

//POST /users/cart
router.post('/cart', requireToken, async (req, res, next) => {
  try {
    let id, newOrUpdatedProduct
    if (req.user) {
      id = req.user.id
      newOrUpdatedProduct = await CartItem.createOrUpdate(id, req.body)
    } else {
      newOrUpdatedProduct = await CartItem.createOrUpdate(null, req.body)
    }
    res.json(newOrUpdatedProduct)
  } catch (error) {
    next(error)
  }
})

//DELETE /users/cart
router.delete('/cart/:itemId', requireToken, async (req, res, next) => {
  try {
    const { itemId } = req.params
    const { user } = req
    await user.removeProduct(itemId)
    res.json('ok')
  } catch (error) {
    next(error)
  }
})

//POST /users/orders
router.post('/orders', requireToken, async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body.order)
    const orderId = newOrder.id
    const cart = req.body.cart
    await CartItem.addOrderNumber(orderId, cart)
    res.json(newOrder)
  } catch (error) {
    next(error)
  }
})

//POST /users/guest/orders
router.post('/guest/orders', async (req, res, next) => {
  try {
    const newOrder = await Order.create(req.body.order)
    const orderId = newOrder.id
    const cart = req.body.cart
    await CartItem.createCartItemsAndAttachOrder(cart, orderId)
    res.json(newOrder)
  } catch (error) {
    next(error)
  }
})
