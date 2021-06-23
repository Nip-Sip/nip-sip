const router = require('express').Router()
const { requireToken, requireAdminToken } = require('../auth/middleware')
const {
  models: { User, CartItem }
} = require('../db')
module.exports = router

//GET /users
router.get('/', requireAdminToken, async (req, res, next) => {
  try {
    const { user } = req
    if (user) {
      const users = await User.findAll({
        attributes: ['id', 'email', 'createdAt', 'isAdmin']
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
    const products = await user.getProducts()
    res.json(products)
  } catch (error) {
    next(error)
  }
})

//POST /users/cart
router.post('/cart', requireToken, async (req, res, next) => {
  try {
    const { id } = req.user
    const newOrUpdatedProduct = await CartItem.createOrUpdate(id, req.body)
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
