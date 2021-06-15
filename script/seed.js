'use strict'

const {
	db,
	models: { User, Product }
} = require('../server/db')

/**
 * seed - this function clears the database, updates tables to
 *      match the models, and populates the database.
 */
async function seed() {
	await db.sync({ force: true }) // clears db and matches models to tables
	console.log('db synced!')

	// Creating Users
	const [cody, murphy, sey, jason] = await Promise.all([
		User.create({ username: 'cody', password: '123' }),
		User.create({ username: 'murphy', password: '456' }),
		User.create({ username: 'sey', password: 'abc' }),
		User.create({ username: 'jason', password: 'def' })
	])

	// Creating Products
	const [jackDaniels, greyGoose, cham, mak, fire] = await Promise.all([
		Product.create({ name: 'Jack Daniels', description: 'Whiskey' }),
		Product.create({ name: 'Grey Goose', description: 'Vodka' }),
		Product.create({ name: 'Cham', description: 'Soju' }),
		Product.create({ name: 'Mak', description: 'Makgali' }),
		Product.create({ name: 'Fire', description: 'Eww' })
	])

	// Magic Methods
	await cody.addProduct(jackDaniels, { through: { quantity: 2 } })
	await cody.addProduct(greyGoose, { through: { quantity: 15 } })
	await murphy.setProducts(greyGoose, { through: { quantity: 5 } })
	// TEST OUT OUR QUERIES HERE

	// const results = await cody.getProducts()
	// const result = await User.findOne({
	// 	where: { username: 'cody' },
	// 	include: Product
	// })

	// console.log(`🟢  result.products `, result.products[0].cartItem)
	// // Creating CartItem
	// const users = await Promise.all([
	//   User.create({ username: 'cody', password: '123' }),
	//   User.create({ username: 'murphy', password: '123' }),
	// ]);

	// console.log(`seeded ${users.length} users`);
	// console.log(`seeded successfully`);
	// return {
	//   users: {
	//     cody: users[0],
	//     murphy: users[1],
	//   },
	// };
}

/*
 We've separated the `seed` function from the `runSeed` function.
 This way we can isolate the error handling and exit trapping.
 The `seed` function is concerned only with modifying the database.
*/
async function runSeed() {
	console.log('seeding...')
	try {
		await seed()
	} catch (err) {
		console.error(err)
		process.exitCode = 1
	} finally {
		console.log('closing db connection')
		await db.close()
		console.log('db connection closed')
	}
}

/*
  Execute the `seed` function, IF we ran this module directly (`node seed`).
  `Async` functions always return a promise, so we can use `catch` to handle
  any errors that might occur inside of `seed`.
*/
if (module === require.main) {
	runSeed()
}

// we export the seed function for testing purposes (see `./seed.spec.js`)
module.exports = seed
