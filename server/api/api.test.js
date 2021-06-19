const request = require('supertest')
const {
  db,
  models: { User, Product }
} = require('../db')
const seed = require('../../script/seed')
const app = require('../app')

describe('User routes', () => {
  beforeEach(async () => {
    await seed()
  })

  describe('/api/users/', () => {
    it('GET /api/users', async () => {
      const res = await request(app).get('/api/users').expect(200)
      const { body } = res

      expect(Array.isArray(body)).toBe(true)
      expect(body.length).toBe(4)
    })
  })

  describe('/api/products/', () => {
    it('GET /api/users', async () => {
      const res = await request(app).get('/api/products').expect(200)
      const { body } = res

      expect(Array.isArray(body)).toBe(true)
      expect(body.length).toBeGreaterThan(20)
    })

    it('POST /api/products', async () => {
      const res = await request(app)
        .post('/api/products')
        .send({ name: 'seys drink' })
        .expect(201)

      const { name, description } = res.body

      expect(name).toBe('seys drink')
      expect(description).toBeNull
    })
  })
})
