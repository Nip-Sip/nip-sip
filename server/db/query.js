const Sequelize = require('sequelize')
const {
  db,
  models: { User, Product, CartItem }
} = require('./index')

async function query() {
  await db.sync()

  const jason = Product.create({
    productId: 4,
    name: 'jason drink',
    price: 444
  })
  console.log(JSON.stringify(jason, null, 2))

  const graphDatabase = {
    Whisky: ['Rum'],
    Tequila: ['Vodka'],
    Vodka: ['Tequila', 'Whisky'],
    Rum: ['Liqeur'],
    Liqueur: ['Vodka']
  }

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
  variety.push(...rows.flat())
  variety.sort((a, b) => a.id - b.id) // sort by id to fake randomness

  // send back 5 rows
  res.send(variety.slice(0, 5))
  // console.log(JSON.stringify(userSameRows, null, 2))
  // r1,r2
  db.close()
  //
}

query()
