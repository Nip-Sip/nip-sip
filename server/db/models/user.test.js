const {
  db,
  models: { User }
} = require('../index')
const jwt = require('jsonwebtoken')
const seed = require('../../../script/seed')

describe('User model', () => {
  let users
  beforeEach(async () => {
    users = (await seed()).users
  })

  describe('instanceMethods', () => {
    describe('generateToken', () => {
      it('returns a token with the id of the user', async () => {
        const token = await users.cody.generateToken()
        const { id } = await jwt.verify(token, process.env.JWT)
        expect(id).toBe(users.cody.id)
      })
    }) // end describe('correctPassword')
    describe('authenticate', () => {
      let user
      beforeEach(
        async () =>
          (user = await User.create({
            username: 'lucy',
            password: 'loo'
          }))
      )
      describe('with correct credentials', () => {
        it('returns a token', async () => {
          const token = await User.authenticate({
            username: 'lucy',
            password: 'loo'
          })
          expect(token).not.toBeNull
        })
      })
      describe('with incorrect credentials', () => {
        it('throws a 401', async () => {
          try {
            await User.authenticate({
              username: 'lucy@gmail.com',
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
