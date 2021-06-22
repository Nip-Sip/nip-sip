import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { createProduct, deleteProduct } from '../store/products'
import { getAdminInfo } from '../store/admin'
import { ContactSupportOutlined } from '@material-ui/icons'

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

  const [deletedId, setDeletedId] = useState('')

  const handleDeleteSubmit = e => {
    e.preventDefault()
    dispatch(deleteProduct(deletedId))
    setDeletedId('')
  }

  const handleDeleteChange = e => {
    console.log('this delete id!!', deletedId)
    setDeletedId(e.target.value)
  }
  return (
    <div>
      <h3>Welcome, {username}</h3>
      <div id="userOptionsBody">
        {admin.length ? (
          <React.Fragment>
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
            </form>
            <form onSubmit={handleDeleteSubmit}>
              <label htmlFor="productId">Product Id</label>
              <input
                type="text"
                onChange={handleDeleteChange}
                value={deletedId}
                placeholder="Product Id"
              />
              <p>
                <button type="submit">Update</button>

                <button type="submit">Delete</button>
              </p>
            </form>
          </React.Fragment>
        ) : (
          'hello world'
        )}
      </div>
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
