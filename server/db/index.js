const db = require('./db')

const User = require('./models/user')
const Product = require('./models/product')
const CartItem = require('./models/cartItem')
const Order = require('./models/order')

User.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(User, { through: CartItem })
CartItem.belongsTo(Product)
CartItem.belongsTo(User)
User.hasMany(CartItem)
Product.hasMany(CartItem)
Order.hasMany(CartItem)
CartItem.belongsTo(Order)

module.exports = {
  db,
  models: {
    User,
    Product,
    CartItem,
    Order
  }
}
