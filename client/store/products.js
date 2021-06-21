import axios from 'axios'

// ACTION_TYPE
const GOT_PRODUCTS = 'GOT_PRODUCTS'
const CREATED_PRODUCT = 'CREATED PRODUCT'
const DELETED_PRODUCT = 'DELETED PRODUCT'

// ACTION CREATOR
export const gotProducts = products => {
  return {
    type: GOT_PRODUCTS,
    products
  }
}

export const createdProduct = product => {
  return {
    type: CREATED_PRODUCT,
    product
  }
}

export const deletedProduct = product => {
  return {
    type: DELETED_PRODUCT,
    product
  }
}

// THUNK
export const getProducts = () => {
  return async dispatch => {
    const { data: products } = await axios.get('/api/products')
    dispatch(gotProducts(products))
  }
}

export const createProduct = product => {
  return async dispatch => {
    const token = window.localStorage.getItem('token')
    if (token) {
      const { data: newProduct } = await axios.post('/api/products', product, {
        headers: {
          authorization: token
        }
      })

      dispatch(createdProduct(newProduct))
    }
  }
}

export const deleteProduct = id => {
  return async dispatch => {
    const token = window.localStorage.getItem('token')
    if (token) {
      const { data: destroyProduct } = await axios.delete(
        `/api/products/${id}`,
        {
          headers: {
            authorization: token
          }
        }
      )
      dispatch(deletedProduct(destroyProduct))
    }
  }
}

// REDUCER

export default function productsReducer(state = [], action) {
  switch (action.type) {
    case GOT_PRODUCTS:
      return action.products
    case CREATED_PRODUCT:
      return [...state, action.product]
    case DELETED_PRODUCT:
      return state.filter(product => product.id !== action.product.id)
    default:
      return state
  }
}
