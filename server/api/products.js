const router = require('express').Router()
const {
  models: { Product }
} = require('../db')
const { requireAdminToken } = require('../auth/middleware')
module.exports = router

//GET /api/products
router.get('/', async (req, res, next) => {
  try {
    const products = await Product.findAll()
    res.json(products)
  } catch (error) {
    next(error)
  }
})

//GET /api/products/:productId
router.get('/:productId', async (req, res, next) => {
  try {
    const product = await Product.findByPk(req.params.productId)
    res.json(product)
  } catch (error) {
    next(error)
  }
})

//POST /api/products/
router.post('/', requireAdminToken, async (req, res, next) => {
  try {
    const { user } = req
    if (user) {
      res.status(201).send(await Product.create(req.body))
    }
  } catch (err) {
    next(err)
  }
})

//UPDATE /api/products/:id
router.put('/:id', requireAdminToken, async (req, res, next) => {
  try {
    const { user } = req
    if (user) {
      const currProduct = await Product.findByPk(req.params.id)
      res.send(await currProduct.update(req.body))
    }
  } catch (err) {
    next(err)
  }
})

//DELETE /api/products/:id
router.delete('/:id', requireAdminToken, async (req, res, next) => {
  try {
    const { user } = req
    if (user) {
      const currProduct = await Product.findByPk(req.params.id)
      await currProduct.destroy()
      res.send(currProduct)
    }
  } catch (err) {
    next(err)
  }
})
