const { Op } = require('sequelize')
const {
  db,
  models: { User, Product }
} = require('../index')
// const jwt = require('jsonwebtoken')
const seed = require('../../../script/seed')
const { blue } = require('chalk')

describe('Product model', () => {
  let products
  /* beforeAll runs once per the entire describe block */
  beforeAll(async () => {
    const res = await seed()
    products = res.products
  })

  afterAll(() => {
    db.close()
  })

  it('queries a known product by name', async () => {
    const kahlua = Product.findOne({ where: { name: 'KAHLUA' } })
    expect(kahlua).not.toBe(null)
  })

  it('gets back users via magic method', async () => {
    const p = await Product.findAll()
    const firstUser = await p[0].getUsers()
    expect(Array.isArray(firstUser)).toBe(true)
  })

  describe('Advanced Sequelize Examples', () => {
    /* beforeEach will run once per tests in THIS block */
    beforeEach(async () => {
      // // console.log(blue('beforeEach!'))
    })

    it('finds products by email (given sey owns a product)', async () => {
      const P = await Product.findAll({
        include: [
          {
            model: User,
            where: { email: 'sey' }
          }
        ]
      })

      /**
       * Each product will carry a users attribute which is itself an array of
       * users. In this case, each product is mapped to an array of all users that
       * has the products in its cart.
       */

      const pUsers = P.map(p => p.users.map(u => u.email))
      // console.log(pUsers)
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
})
