const { Op } = require('sequelize')
const {
  db,
  models: { User, Product, CartItem }
} = require('../index')
// const jwt = require('jsonwebtoken')
const seed = require('../../../script/seed')
const { blue } = require('chalk')

describe('Product model', () => {
  let products, sey, jason, adam, kyle

  /* beforeAll runs once per the entire describe block */
  beforeAll(async () => {
    const res = await seed()
    products = res.products
    sey = res.users.sey
    jason = res.users.jason
    adam = res.users.adam
    kyle = res.users.kyle
  })

  afterAll(() => {
    // db.close()
  })

  xit('queries a known product by name', async () => {
    const kahlua = Product.findOne({ where: { name: 'KAHLUA' } })
    expect(kahlua).not.toBe(null)
  })

  xit('gets back users via magic method', async () => {
    const p = await Product.findAll()
    const firstUser = await p[0].getUsers()
    expect(Array.isArray(firstUser)).toBe(true)
  })

  xdescribe('Advanced Sequelize Examples', () => {
    /* beforeEach will run once per tests in THIS block */
    beforeEach(async () => {
      // // console.log(blue('beforeEach!'))
    })

    it('finds products by username (given sey owns a product)', async () => {
      const P = await Product.findAll({
        include: [
          {
            model: User,
            where: { username: 'sey' }
          }
        ]
      })

      /**
       * Each product will carry a users attribute which is itself an array of
       * users. In this case, each product is mapped to an array of all users that
       * has the products in its cart.
       */

      const pUsers = P.map(p => p.users.map(u => u.username))
      console.log(`🟢  pUsers `, pUsers)
      expect(pUsers[0][0]).toBe('sey')
      const flatArr = pUsers.flat()
      expect(flatArr).toContain('sey')
      expect(flatArr).not.toContain('jason')
    })

    test('product cannot be created without name', async () => {
      try {
        await Product.create({
          description: '_'
        })
      } catch (e) {
        expect(e.name).toBe('SequelizeValidationError')
        expect(e.errors[0].message).toBe('product.name cannot be null')
      }
    })
  })

  xdescribe('Magic Methods', () => {
    test('getProducts via initial seed', async () => {
      const seyP = await sey.getProducts()
      expect(seyP.length).toBe(2)

      const jasonP = await jason.getProducts()
      expect(jasonP.length).toBe(3)

      const adamP = await adam.getProducts()
      expect(Array.isArray(adamP)).toBe(true)
      expect(adamP.length).toBe(19)

      const kyleP = await kyle.getProducts()
      expect(kyleP.length).toBe(0)
    })
  })

  xtest('getUsers via initial seed', async () => {
    const p0u = await products[0].getUsers()
    const p1u = await products[1].getUsers()
    const p10u = await products[10].getUsers()

    expect(p0u.length).toBe(1)
    expect(p1u.length).toBe(2)
    expect(p10u.length).toBe(0)
  })

  test('getCart', async () => {
    // await sey.getCartItems()
  })
})
