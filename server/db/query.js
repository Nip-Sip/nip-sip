const Sequelize = require('sequelize')
const {
  db,
  models: { User, Product }
} = require('./index')

async function query() {
  await db.sync()

  const cody = await User.findOne({ where: { username: 'cody' } })
  const sey = await User.findOne({ where: { username: 'sey' } })

  const codyProducts = await cody.getProducts()
  const seyProducts = await sey.getProducts()
  const allProducts = await Product.findAll()

  console.log(codyProducts.length)
}

query()
