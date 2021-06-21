const {
  models: { User }
} = require('../db')

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    const user = await User.findByToken(token)
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
      const err = new Error('Not an admin')
      err.status = 401
      throw err
    }
    next()
  } catch (error) {
    next(error)
  }
}

module.exports = {
  requireToken,
  requireAdminToken
}
