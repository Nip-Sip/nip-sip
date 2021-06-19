const router = require('express').Router()
const {
  models: { User }
} = require('../db')
const { requireToken, requireAdminToken } = require('./middleware')
module.exports = router

router.post('/login', async (req, res, next) => {
  try {
    res.send({ token: await User.authenticate(req.body) })
  } catch (err) {
    next(err)
  }
})

router.post('/signup', async (req, res, next) => {
  try {
    const user = await User.create(req.body)
    res.send({ token: await user.generateToken() })
  } catch (err) {
    if (err.name === 'SequelizeUniqueConstraintError') {
      res.status(401).send('User already exists')
    } else {
      next(err)
    }
  }
})

router.get('/me', requireToken, async (req, res, next) => {
  try {
    const { user } = req
    if (user) res.send(user)
    else throw Error('auth/me route failed')
  } catch (ex) {
    next(ex)
  }
})

// GET auth/admin
router.get('/admin', requireAdminToken, async (req, res, next) => {
  try {
    // const { user } = req
    // if (user) res.send(user)
    const users = await User.findAll()
    res.json(users)
  } catch (ex) {
    next(ex)
  }
})
