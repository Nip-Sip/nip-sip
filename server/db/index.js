const db = require('./db')

const User = require('./models/user')
const Product = require('./models/product')
const CartItem = require('./models/cartItem')
const Order = require('./models/orders')

User.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(User, { through: CartItem })
// Order.hasMany(CartItem)
// CartItem.belongsTo(Order)

module.exports = {
  db,
  models: {
    User,
    Product,
    CartItem,
    Order
  }
}
