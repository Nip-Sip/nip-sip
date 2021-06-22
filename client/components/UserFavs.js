import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFavItem } from '../store/auth'

const UserFavs = ({ favType }) => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  // useSelector(state => state)
  const userFavType = 'Vodka'

  return (
    <div>
      <h1>UserFavs</h1>
      <button onClick={() => dispatch(getFavItem)}>Get Fav Item</button>
      <div>DEBUGGING: {JSON.stringify(auth.fav)}</div>
    </div>
  )
}

export default UserFavs

// User favorite type => query the database and show it in their information that
// they bought a random whisky??

// const graphDatabase = {
//   Whisky: ['Rum'],
//   Tequila: ['Vodka'],
//   Vodka: ['Tequila', 'Whisky'],
//   Rum: ['Liqeur'],
//   Liqueur: ['Vodka']
// }

// const variety = await Product.findAll({
//   where: { category: userFavType },
//   limit: 3
// })
// // console.log(JSON.stringify(whisky, null, 2))
// // follow the whisky, enter
// // for each in the graph database, do a promise all
// const rows = await Promise.all(
//   graphDatabase[userFavType].map(category =>
//     Product.findAll({
//       where: { category },
//       limit: 2
//     })
//   )
// )

// console.log(`🟢  rows.length `, rows.length)
// // combine into an array of at least 5...
// variety.push(...rows.flat())
// variety.sort((a, b) => a.id - b.id) // sort by id to fake randomness

// // send back 5 rows
// res.send(variety.slice(0, 5))
