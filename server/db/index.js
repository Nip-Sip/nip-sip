//this is the access point for all things database related!

const db = require('./db');

const User = require('./models/user');
const Product = require('./models/product');
const CartItem = require('./models/cartItem');

//associations could go here!

User.belongsToMany(Product, { through: 'CartItem' });
Product.belongsToMany(User, { through: 'CartItem' });

// Product.hasMany(CartItem);
// CartItem.belongsTo(Product);

module.exports = {
  db,
  models: {
    User,
    Product,
    // CartItem,
  },
};

// PRODUCTS
// JD, jack daniels whiskey
// GG, grey goose Vodka

// CART ITEMS
// 1, JD, Quanitty, USER A
// 2, GG, QTY
// 3, JD, QTY, USER B

// USER A has many cartItems
// 1 2

// USER B
