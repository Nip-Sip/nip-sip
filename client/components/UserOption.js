import React, { useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'

const UserOption = () => {
  const { username } = useSelector(state => state.auth)

  const [state, setState] = useState({
    name: '',
    description: '',
    type: ''
  })

  const handleSubmit = e => {
    e.preventDefault()
    console.log(e.target.value)
  }

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  return (
    <div>
      <h3>Welcome, {username}</h3>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          onChange={handleChange}
          name="name"
          type="text"
          placeholder="name"
        />
        <label htmlFor="price">Price</label>
        <input
          onChange={handleChange}
          name="price"
          type="number"
          placeholder="price"
        />
        <label htmlFor="description">Description</label>
        <input
          onChange={handleChange}
          name="description"
          type="text"
          placeholder="description"
        />
        <label htmlFor="caategory">Category</label>
        <select onChange={handleChange}>
          <option value="Whisky">Whisky</option>
          <option value="Tequila">Tequila</option>
          <option selected value="Vodka">
            Vodka
          </option>
          <option value="Rum">Rum</option>
          <option value="Liqueur">Liqueur</option>
        </select>
        <button type="submit">Create</button>

        <input type="text" placeholder="id" />
        <button type="submit">Update</button>
        <button type="submit">Delete</button>
      </form>
    </div>
  )
}

/**
 * COMPONENT
 */
// export const Home = props => {
//   const { username } = props

//   return (
//     <div>
//       <h3>Welcome, {username}</h3>
//       <Home1 />
//     </div>
//   )
// }

/**
 * CONTAINER
 */
// const mapState = state => {
//   return {
//     username: state.auth.username
//   }
// }

// export default connect(mapState)(Home)

export default UserOption
