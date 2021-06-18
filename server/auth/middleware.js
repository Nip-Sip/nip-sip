const {
  models: { User }
} = require('../db')

const requireToken = async (req, res, next) => {
  try {
    const token = req.headers.authorization
    console.log(`🟢  token inside requireToken `, token)
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
      throw Error('Not an admin')
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
