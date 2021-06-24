const router = require('express').Router()
const {
  models: { CartItem, Product, Shop }
} = require('../db')
const { requireToken } = require('../auth/middleware')
module.exports = router

//GET /api/store/
router.get('/', requireToken, async (req, res, next) => {
  try {
    const { user } = req
    if (user) {
      const { id } = user
      // res.json(mostBought[0])
      const shop = await Shop.findOne({ where: { userId: id } })
      const products = await shop.getProducts()
      res.json(products)
    }
  } catch (err) {
    next(err)
  }
})

//GET /api/store/info
router.get('/info', requireToken, async (req, res, next) => {
  try {
    const { user } = req
    if (user) {
      const { id } = user
      // res.json(mostBought[0])
      const shop = await Shop.findOne({ where: { userId: id } })
      console.log(JSON.stringify(shop, null, 2))
      res.json(shop)
    }
  } catch (err) {
    next(err)
  }
})

// //GET /api/products/:productId
// router.get('/:productId', async (req, res, next) => {
//   try {
//     const product = await Product.findByPk(req.params.productId)
//     res.json(product)
//   } catch (error) {
//     next(error)
//   }
// })

// //POST /api/products/
// router.post('/', requireAdminToken, async (req, res, next) => {
//   try {
//     const { user } = req
//     if (user) {
//       res.status(201).send(await Product.create(req.body))
//     }
//   } catch (err) {
//     next(err)
//   }
// })

// //UPDATE /api/products/:id
// router.put('/:id', requireAdminToken, async (req, res, next) => {
//   try {
//     const { user } = req
//     if (user) {
//       const currProduct = await Product.findByPk(req.params.id)

//       res.send(await currProduct.update(req.body))
//     }
//   } catch (err) {
//     next(err)
//   }
// })

// //DELETE /api/products/:id
// router.delete('/:id', requireAdminToken, async (req, res, next) => {
//   try {
//     const { user } = req
//     if (user) {
//       const currProduct = await Product.findByPk(req.params.id)
//       await currProduct.destroy()
//       res.send(currProduct)
//     }
//   } catch (err) {
//     next(err)
//   }
// })
