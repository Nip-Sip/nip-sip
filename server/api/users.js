const router = require('express').Router()
const {
  models: { User, CartItem }
} = require('../db')
module.exports = router

//GET /users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // explicitly select only the id and username fields - even though
      // users' passwords are encrypted, it won't help if we just
      // send everything to anyone who asks!
      attributes: ['id', 'username']
    })
    res.json(users)
  } catch (err) {
    next(err)
  }
})

//GET /users/:userId/cart
router.get('/:userId/cart', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.userId)
    const products = await user.getProducts()
    res.json(products)
  } catch (error) {
    next(error)
  }
})

// //DELETE /users/:userId/cart
// router.delete('/:userId/cart', async (req, res, next) => {
//   try {
//     const user = await User.findByPk('')
//     await CartItem
//   } catch (error) {
//     next(error)
//   }
// })

//POST /users/:userId/cart
router.post('/:userId/cart', async (req, res, next) => {
  try {
    console.log(req.body)
    const [newOrUpdatedProduct, isCreated] = await CartItem.findOrCreate({
      userId: req.params.userId,
      productId: req.body.id
    })
    newOrUpdatedProduct.quantity = req.body.CartItem.quantity
    res.send(newOrUpdatedProduct)
  } catch (error) {
    next(error)
  }
})
