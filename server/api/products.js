const router = require('express').Router()
const {
  models: { Product }
} = require('../db')
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
router.post('/', async (req, res, next) => {
  try {
    res.status(201).send(await Product.create(req.body))
  } catch (err) {
    next(err)
  }
})

//UPDATE /api/products/
router.put('/', async (req, res, next) => {
  try {
    const currProduct = await Product.findByPk(req.body.productId)
    res.send(await currProduct.update(req.body))
  } catch (err) {
    next(err)
  }
})

//DELETE /api/products/
router.delete('/', async (req, res, next) => {
  try {
    const currProduct = await Product.findByPk(req.body.productId)
    await currProduct.destroy()
    res.send(currProduct)
  } catch (err) {
    next(err)
  }
})
