const Sequelize = require('sequelize')
const {
  db,
  models: { User, Product, CartItem }
} = require('./index')

async function query() {
  await db.sync()

  // const cody = await User.findOne({ where: { username: 'cody' } })
  // const sey = await User.findOne({ where: { username: 'sey' } })
  // const codyProducts = await cody.getProducts()
  // const seyProducts = await sey.getProducts()
  // const allProducts = await Product.findAll()

  // this is useful to find the top 5 items that people bought
  const c = await CartItem.findAll({
    limit: 5,
    order: [['quantity', 'DESC']]
  })

  console.log(JSON.stringify(c, null, 2))
}

query()
