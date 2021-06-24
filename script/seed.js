const fetch = require('node-fetch')
const googleJSONCleaner = require('./googleJSONCleaner')
const { white, blue, green } = require('chalk')

const {
  db,
  models: { User, Product, Order, CartItem, Shop }
} = require('../server/db')

async function seed() {
  await db.sync({ force: true })
  console.log(
    `${blue('db synced!')}: process.env.NODE_ENV: ${process.env.NODE_ENV}`
  )

  let products
  if (process.env.NODE_ENV === 'test') {
    const seedData = require('../server/db/seed.json')
    const { products, users, orders } = seedData

    /* 👇 Seems to be in order */
    const [sey, jason, adam, kyle] = await User.bulkCreate(users, {
      returning: true
    })
    const dbProducts = await Product.bulkCreate(products, { returning: true })
    const dbOrders = await Order.bulkCreate(orders, { returning: true })
    /* 👇 Not in order */

    /**
     * Uses addProduct method to link user to products in CartItem Model
     */
    await Promise.all([
      sey.addProduct(dbProducts[0], { through: { quantity: 10 } }),
      sey.addProduct(dbProducts[1], { through: { quantity: 15 } }),
      sey.addProduct(dbProducts[2], { through: { quantity: 25 } }),
      sey.addProduct(dbProducts[3], { through: { quantity: 35 } }),
      sey.addProduct(dbProducts[4], { through: { quantity: 45 } }),
      sey.addProduct(dbProducts[5], { through: { quantity: 55 } }),
      sey.addProduct(dbProducts[6], { through: { quantity: 65 } }),
      sey.addProduct(dbProducts[7], { through: { quantity: 100 } }),
      jason.addProduct(dbProducts[1], { through: { quantity: 25 } }),
      jason.addProduct(dbProducts[2], { through: { quantity: 55 } }),
      jason.addProduct(dbProducts[3], { through: { quantity: 15 } })
    ])
    await Promise.all(
      dbProducts
        .slice(5)
        .map(p => adam.addProduct(p, { through: { quantity: 50 } }))
    )

    return {
      users: {
        sey,
        jason,
        adam,
        kyle
      },
      products: dbProducts,
      orders: dbOrders
    }
  } else {
    /**
     * else regular seed below 👇
     *
     */
    const res = await fetch(
      'https://spreadsheets.google.com/feeds/list/10cEXh46270XlAqXNipbqreiUqr6uXMdowKi_w3aRYcM/1/public/values?alt=json'
    )
    const json = await res.json()
    const unformattedProducts = json.feed.entry
    products = googleJSONCleaner(unformattedProducts)

    const { users, orders, shop } = require('../server/db/seed.json')
    // Possibly may not be in order? 👇
    const [sey, jason, adam, kyle, cody, murphy] = await Promise.all(
      users.map(u => User.create(u))
    )

    // Create the 🛍️
    const [seyS, adamS, jasonS, kyleS] = await Promise.all(
      shop.map(s => Shop.create(s))
    )
    await sey.setShop(seyS)
    await adam.setShop(adamS)
    await jason.setShop(jasonS)
    await kyle.setShop(kyleS)

    await Promise.all(
      products.map(async (product, i) => {
        // for product
        const p = await Product.create(product)
        if (i % 3 === 0) {
          if (i < 20) await seyS.addProduct(p)
          if (i <= 12) await adam.addProduct(p)
          return cody.addProduct(p, { through: { quantity: (i + 1) * 10 } })
        } else if (i % 2 === 1) {
          await jasonS.addProduct(p)
          return sey.addProduct(p, { through: { quantity: (i + 1) * 5 } })
        } else {
          kyleS.addProduct(p)
          adam.addProduct(p)
          return jason.addProduct(p, { through: { quantity: (i + 1) * 7 } })
        }
      })
    )

    const [o1, o2] = await Promise.all([
      Order.create({
        address: 'Somewhere 123',
        price: 150,
        pricePaid: 150,
        promo: 'AXZ'
      }),
      Order.create({
        address: 'Whereever 123',
        price: 100,
        pricePaid: 80,
        promo: 'ABC'
      })
    ])

    return {
      users: {
        cody,
        murphy,
        sey,
        jason
      },
      products,
      shop
    }
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
    console.log(blue('closing db connection'))
    await db.close()
    console.log(blue('db connection closed'))
  }
}

if (module === require.main) {
  runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
