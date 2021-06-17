/* global describe beforeEach it */

const { expect } = require('chai')
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

      expect(res.body).to.be.an('array')
      expect(res.body.length).to.equal(4)
    })
  })

  describe('/api/products/', () => {
    it('GET /api/users', async () => {
      const res = await request(app).get('/api/products').expect(200)

      expect(res.body).to.be.an('array')
      expect(res.body.length).to.greaterThan(20)
    })

    it('POST /api/products', async () => {
      const res = await request(app)
        .post('/api/products')
        .send({ name: 'seys drink' })
        .expect(201)

      expect(res.body.name).to.have.string('seys drink')
      // Sequelize returns null when description is not provided
      expect(res.body.description).to.be.null
    })
  })
})
