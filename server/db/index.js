const db = require('./db')

const User = require('./models/user')
const Product = require('./models/product')
const CartItem = require('./models/cartItem')

User.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(User, { through: CartItem })

module.exports = {
  db,
  models: {
    User,
    Product,
    CartItem
  }
}
