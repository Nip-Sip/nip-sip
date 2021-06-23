import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { createProduct, deleteProduct, updateProduct } from '../store/products'
import { getAdminInfo } from '../store/admin'

const AdminOptions = () => {
  const dispatch = useDispatch()
  const { admin, auth } = useSelector(s => s)

  useEffect(() => {
    dispatch(getAdminInfo())
  }, [])

  const [state, setState] = useState({
    productId: '',
    name: '',
    description: '',
    category: '',
    price: '',
    ABV: ''
  })

  const handleSubmit = e => {
    e.preventDefault()

    dispatch(createProduct(state))
    setState({
      productId: '',
      name: '',
      description: '',
      category: '',
      price: '',
      ABV: ''
    })
  }
  const handleChange = e => {
    setState({ ...state, [e.target.name]: e.target.value })
  }

  const handleUpdate = e => {
    e.preventDefault()

    let updateObj = {}
    Object.keys(state).forEach(k => {
      if (state[k] !== '') {
        updateObj[k] = state[k]
      }
    })
    dispatch(updateProduct(updateObj))
    setState({
      productId: '',
      name: '',
      description: '',
      category: '',
      price: '',
      ABV: ''
    })
  }

  const handleDelete = e => {
    e.preventDefault()
    dispatch(deleteProduct(state.productId))
    setState({
      productId: '',
      name: '',
      description: '',
      category: '',
      price: '',
      ABV: ''
    })
  }

  return (
    <div>
      <div id="userOptionsBody">
        {admin.length ? (
          <form>
            <label htmlFor="productId">Product Id</label>
            <input
              name="productId"
              onChange={handleChange}
              type="text"
              placeholder="Product Id"
              value={state.productId}
            />
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
            <label htmlFor="ABV">ABV</label>
            <input
              onChange={handleChange}
              name="ABV"
              type="number"
              min="0"
              max="1"
              step="any"
              placeholder="ABV (decimal)"
              value={state.ABV}
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
              <button onClick={handleSubmit} id="submitButton" type="submit">
                Create
              </button>

              <button onClick={handleUpdate} id="updateButton" type="submit">
                Update
              </button>

              <button onClick={handleDelete} id="deleteButton" type="submit">
                Delete
              </button>
            </p>
          </form>
        ) : (
          '401: FORBIDDEN'
        )}
      </div>
    </div>
  )
}

export default AdminOptions
