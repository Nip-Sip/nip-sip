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

// //POST /users/:userId/cart
// router.post('/:userId/cart', async (req, res, next) => {
//   try {
//     const user = await User.findByPk(req.params.userId)
//     const product = await user.addProduct(req.body)
//     console.log(product)
//     res.status(201).send(product)
//   } catch (error) {
//     next(error)
//   }
// })
