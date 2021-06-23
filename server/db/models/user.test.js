const {
  db,
  models: { User }
} = require('../index')
const jwt = require('jsonwebtoken')
const seed = require('../../../script/seed')
const { blue } = require('chalk')

describe('User model', () => {
  let users
  beforeEach(async () => {
    users = (await seed()).users
  })

  describe('instanceMethods', () => {
    describe('generateToken', () => {
      it('returns a token with the id of the user', async () => {
        const token = await users.sey.generateToken()
        const { id } = await jwt.verify(token, process.env.JWT)
        expect(id).toBe(users.sey.id)
      })
    })

    describe('authenticate', () => {
      let user
      beforeEach(
        async () =>
          (user = await User.create({
            email: 'lucy@gmail.com',
            password: 'loo'
          }))
      )

      describe('with correct credentials', () => {
        it('returns a token', async () => {
          const token = await User.authenticate({
            email: 'lucy@gmail.com',
            password: 'loo'
          })
          expect(typeof token === 'string').toBe(true)
        })
      })

      describe('with incorrect credentials', () => {
        it('throws a 401', async () => {
          try {
            await User.authenticate({
              email: 'lucy',
              password: '123'
            })
            throw 'nooo'
          } catch (ex) {
            expect(ex.status).toBe(401)
          }
        })
      })
    }) // end describe('authenticate')
  }) // end describe('instanceMethods')
}) // end describe('User model')
