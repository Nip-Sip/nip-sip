import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { createProduct } from '../store/products'
import { getAdminInfo } from '../store/admin'

const UserOption = () => {
  const { username } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const { admin, auth } = useSelector(s => s)

  useEffect(() => {
    dispatch(getAdminInfo())
  }, [])

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
      <div id="userOptionsBody">
        {admin.length ? (
          <form onSubmit={handleSubmit}>
            <label htmlFor="name">Name</label>
            <input
              onChange={handleChange}
              name="name"
              type="text"
              placeholder="Product Name"
              value={state.name}
            />

            <label htmlFor="price">Price</label>
            <input
              onChange={handleChange}
              name="price"
              type="number"
              min="0.01"
              step="any"
              placeholder="Product Price"
              value={state.price}
            />
            <label htmlFor="description">Description</label>
            <input
              onChange={handleChange}
              name="description"
              type="text"
              placeholder="Product Description"
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
            <p>
              <button type="submit">Create</button>
            </p>
            <label htmlFor="productId">Product Id</label>
            <input type="text" placeholder="Product Id" />
            <p>
              <button type="submit">Update</button>

              <button type="submit">Delete</button>
            </p>
          </form>
        ) : (
          'hello world'
        )}
      </div>
    </div>
  )
}

export default UserOption
