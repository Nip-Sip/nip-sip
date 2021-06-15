const Sequelize = require('sequelize')
const {
	db,
	models: { User, Product }
} = require('./index')

async function query() {
	// db syncs...
	await db.sync()

	const cody = await User.findOne({ where: { username: 'cody' } })
	const sey = await User.findOne({ where: { username: 'sey' } })

	// console.log(sey.username)
	const codyProducts = await cody.getProducts()
	const seyProducts = await sey.getProducts()
	const allProducts = await Product.findAll()

	console.log(codyProducts.length)
	// console.log(codyProducts[0].cartItem)
	// console.log(allProducts[0].description)
	// console.log(codyProducts[0].cartItem.quantity)
	// console.log(codyProducts.data)
	// console.log(' - - - - - ')
	// console.log(seyProducts.data)
	// console.log('allProducts', allProducts)
}

query()
