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

  // User category = queryAll: their top choices in the cartItem table...
  //
  //
  // User query: provide the token, and then provide the body [query];
  const userFavType = 'Vodka'
  const variety = await Product.findAll({
    where: { category: userFavType },
    limit: 3
  })
  // console.log(JSON.stringify(whisky, null, 2))
  // follow the whisky, enter
  // for each in the graph database, do a promise all
  const rows = await Promise.all(
    graphDatabase[userFavType].map(category =>
      Product.findAll({
        where: { category },
        limit: 2
      })
    )
  )

  console.log(`🟢  rows.length `, rows.length)
  // combine into an array of at least 5...
  variety.push(...rows.flat()).sort()

  console.log(`🟢  variety[0] `, variety[0])
  // console.log(JSON.stringify(userSameRows, null, 2))
  // r1,r2
  db.close()
  //
}

query()
