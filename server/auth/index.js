const router = require('express').Router()
const {
  models: { User }
} = require('../db')
module.exports = router

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const user = await User.findByToken(token)
    // TODO: insert a custom error here...
    req.user = user
    next()
  } catch (error) {
    next(error)
  }
}

const requireAdminToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const user = await User.findByToken(token)
    if (user.isAdmin) {
      req.user = user
    } else {
      throw Error('Not an admin')
    }
    next()
  } catch (error) {
    next(error)
  }
}

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

router.get('/me', async (req, res, next) => {
  try {
    res.send(await User.findByToken(req.headers.authorization))
  } catch (ex) {
    next(ex)
  }
})
