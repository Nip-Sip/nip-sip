const Sequelize = require('sequelize')
const {
  db,
  models: { User, Product, CartItem }
} = require('./index')

const graphDatabase = {
  Whisky: ['Rum'],
  Tequila: ['Vodka'],
  Vodka: ['Tequila', 'Whisky'],
  Rum: ['Liqeur'],
  Liqueur: ['Vodka']
}

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

  // console.log(JSON.stringify(c, null, 2))

  const whisky = await Product.findOne({ where: { category: 'Whisky' } })
}

query()
