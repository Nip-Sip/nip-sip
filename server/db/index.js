const db = require('./db')

const User = require('./models/user')
const Product = require('./models/product')
const CartItem = require('./models/cartItem')
const Order = require('./models/order')
const Shop = require('./models/shop')

User.belongsToMany(Product, { through: CartItem })
Product.belongsToMany(User, { through: CartItem })
CartItem.belongsTo(Product)
CartItem.belongsTo(User)
User.hasMany(CartItem)
Product.hasMany(CartItem)
Order.hasMany(CartItem)
CartItem.belongsTo(Order)
Shop.belongsToMany(Product, { through: 'shop_product' })
Product.belongsToMany(Shop, { through: 'shop_product' })

module.exports = {
  db,
  models: {
    User,
    Product,
    CartItem,
    Order,
    Shop
  }
}
