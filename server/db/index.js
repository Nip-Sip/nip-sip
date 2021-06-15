//this is the access point for all things database related!

const db = require('./db')

const User = require('./models/User')
const Product = require('./models/product')
const CartItem = require('./models/cartItem')
 // const Cart = require('./models/cartItem')

//associations could go here!
User.hasMany(CartItem)
CartItem.belongsTo(User)

Product.hasOne(CartItem)
CartItem.belongsTo(Product)

module.exports = {
  db,
  models: {
    User,
    Product,
    CartItem,
    //Cart
  },
}
