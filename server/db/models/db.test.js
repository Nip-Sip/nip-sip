const { Op } = require('sequelize')
const {
  db,
  models: { User, Product, CartItem, Order }
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

  describe('Magic Methods', () => {
    xtest('getProducts via initial seed', async () => {
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

    xtest('getUsers via initial seed', async () => {
      const p0u = await products[0].getUsers()
      const p1u = await products[1].getUsers()
      const p10u = await products[10].getUsers()

      expect(p0u.length).toBe(1)
      expect(p1u.length).toBe(2)
      expect(p10u.length).toBe(0)
    })

    xtest('getCart basic', async () => {
      const seyC = await sey.getCartItems()
      expect(seyC.length).toBe(8)

      const jasonC = await jason.getCartItems()
      expect(jasonC.length).toBe(3)

      // const cKyle = await
      // const cAadam = await
    })

    xtest('should get quantities', async () => {
      const seyC = await sey.getCartItems()
      expect(seyC[0].quantity).toBe(10)

      const sum = seyC.reduce((a, b) => a + b.quantity, 0)
      expect(sum).toBe(10 + 15 + 25 + 35 + 45 + 55 + 65 + 100)
    })

    xdescribe('Cart', () => {
      let carts, cart1
      beforeEach(async () => {
        carts = await CartItem.findAll()
        cart1 = carts[0]
      })

      test('Cart => getUser', async () => {
        const user = await cart1.getUser()
        // console.log(JSON.stringify(user, null, 2))
      })

      test('Cart => getProduct', async () => {
        const user = await cart1.getProduct()
        // console.log(JSON.stringify(product, null, 2))
      })
    })
  })

  xdescribe('Super Many-to-Many', () => {
    xtest('User => Product', async () => {
      const U_P = await User.findAll({
        where: {
          username: 'sey'
        },
        include: Product
      })
      const seyP = U_P[0].products
      expect(seyP.length).toBe(2)
    })

    xtest('Product => User', async () => {
      const P_Whisky_U = await Product.findAll({
        where: {
          category: 'Whisky'
        },
        include: {
          model: User,
          where: {
            username: 'sey'
          }
        }
      })
      // console.log(JSON.stringify(P_Whisky_U, null, 2))
      const p = P_Whisky_U[0]
      expect(p.category).toBe('Whisky')
      expect(p.users[0].username).toBe('sey')
    })

    xtest('CartItem => User', async () => {
      const C = await CartItem.findAll({
        where: { userId: 1 },
        include: { model: User }
      })
      // console.log(JSON.stringify(C, null, 2))
      expect(C[0].user.id).toBe(1)
    })
  })

  xdescribe('Cart', () => {
    beforeEach(async () => {
      await seed()
    })

    test('should get all cartitems that are not orders', async () => {
      const seyCart = await CartItem.findAll({ where: { userId: 1 } })

      await Promise.all(
        seyCart.map((e, i) => {
          if (i % 2) return e.update({ orderId: 1 })
        })
      )
      // Mock rows: update every other order as order 1
      // await Promise.all(
      //   seyCart.map((e, i) => {
      //     if (i % 2 === 0) return e.update({ orderId: 1 })
      //   })
      // )

      const cl = await CartItem.findAll({
        where: { userId: 1 }
      })

      const cartItems = await CartItem.findAll({
        where: {
          [Op.and]: [{ orderId: null }, { userId: 1 }]
        }
      })

      // console.log(JSON.stringify(cartItems, null, 2))
      expect(cartItems.length).toBe(4)
    })
  })

  xdescribe('Order', () => {
    beforeEach(async () => {
      await seed()
    })
    /**
     * The flow would go something like this:
     * - To get user's orders,
     * 	- query CartItem for user id via
     *  - user.getCartItems()
     * create Order row
     * update CartItem to have that fk
     * try-catch
     */
    xtest('turn all cart items into orders', async () => {
      // const getSeyOrders = await CartItem.findAll({
      //   include: {
      //     model: User,
      //     where: { username: 'sey' }
      //   }
      // })

      await CartItem.update(
        { orderId: 1 },
        {
          where: {
            userId: 1
          }
        }
      )

      const row = await Order.findByPk(1)
      const cartItems = await row.getCartItems()
      expect(Array.isArray(cartItems)).toBe(true)
    })

    xtest('should all empty cart ids into orders', async () => {
      const updated = await CartItem.update(
        { orderId: 1 },
        {
          where: {
            [Op.and]: [{ userId: 1 }, { quantity: { [Op.lt]: 40 } }]
          }
        }
      )
      // It works!
      console.log(`🟢  updated `, updated)
    })
  })
})
