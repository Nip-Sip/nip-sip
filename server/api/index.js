const router = require('express').Router()
module.exports = router

router.use

router.use('/users', require('./users'))
router.use('/products', require('./products'))
router.use('/store/', require('./store'))

router.use((req, res, next) => {
  const error = new Error('Not Found')
  error.status = 404
  next(error)
})
