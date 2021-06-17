import React, { useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { createProduct } from '../store/products'

const UserOption = () => {
  const { username } = useSelector(state => state.auth)
  const dispatch = useDispatch()

  const [state, setState] = useState({
    name: '',
    description: '',
    category: '',
    price: ''
  })

  const handleSubmit = e => {
    e.preventDefault()
    dispatch(createProduct(state))
    setState({
      name: '',
      description: '',
      category: '',
      price: ''
    })
  }

  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }
  console.log('this the state', state)
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
          value={state.name}
        />

        <label htmlFor="price">Price</label>
        <input
          onChange={handleChange}
          name="price"
          type="number"
          min="0.01"
          step="any"
          placeholder="price"
          value={state.price}
        />
        <label htmlFor="description">Description</label>
        <input
          onChange={handleChange}
          name="description"
          type="text"
          placeholder="description"
          value={state.description}
        />
        <label htmlFor="category">Category</label>
        <select name="category" onChange={handleChange}>
          <option defaultValue="null">Please Select</option>
          <option value="Whisky">Whisky</option>
          <option value="Tequila">Tequila</option>
          <option value="Vodka">Vodka</option>
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
