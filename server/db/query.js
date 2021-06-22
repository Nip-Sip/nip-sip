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
  // const c = await CartItem.findAll({
  //   limit: 5,
  //   order: [['quantity', 'DESC']]
  // })

  const jason = Product.create({
    productId: 4,
    name: 'jason drink',
    price: 444
  })

  console.log(JSON.stringify(jason, null, 2))
}

query()
