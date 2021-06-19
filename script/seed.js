const fetch = require('node-fetch')
const googleJSONCleaner = require('./googleJSONCleaner')
const { white } = require('chalk')

const {
  db,
  models: { User, Product }
} = require('../server/db')

async function seed() {
  await db.sync({ force: true })
  console.log(
    `${white('db synced!')}: process.env.NODE_ENV: ${process.env.NODE_ENV}`
  )

  let products
  if (process.env.NODE_ENV === 'test') {
    products = require('../server/db/seed.json')
  } else {
    const res = await fetch(
      'https://spreadsheets.google.com/feeds/list/10cEXh46270XlAqXNipbqreiUqr6uXMdowKi_w3aRYcM/1/public/values?alt=json'
    )
    const json = await res.json()
    const unformattedProducts = json.feed.entry
    products = googleJSONCleaner(unformattedProducts)
  }

  // TODO, make database smaller for test
  const [cody, murphy, sey, jason] = await Promise.all([
    User.create({ username: 'cody', password: '123' }),
    User.create({ username: 'murphy', password: '456' }),
    User.create({ username: 'sey', password: 'abc', isAdmin: true }),
    User.create({ username: 'jason', password: 'def' })
  ])

  await Promise.all(
    products.map(async (product, i) => {
      // for product
      const p = await Product.create(product)
      if (i % 3 === 0) {
        return cody.addProduct(p, { through: { quantity: (i + 1) * 10 } })
      } else if (i % 2 === 1) {
        return sey.addProduct(p, { through: { quantity: (i + 1) * 5 } })
      } else {
        return jason.addProduct(p, { through: { quantity: (i + 1) * 7 } })
      }
    })
  )

  // console.log(products)
  return {
    users: {
      cody,
      murphy,
      sey,
      jason
    },
    products
  }
}

async function runSeed() {
  console.log('seeding...')
  try {
    await seed()
  } catch (err) {
    console.error(err)
    process.exitCode = 1
  } finally {
    console.log('closing db connection')
    await db.close()
    console.log('db connection closed')
  }
}

if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
