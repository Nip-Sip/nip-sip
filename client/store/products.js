import axios from 'axios'

// ACTION_TYPE
const GOT_PRODUCTS = 'GOT_PRODUCTS'
const CREATED_PRODUCT = 'CREATED PRODUCT'

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

// THUNK
export const getProducts = () => {
  return async dispatch => {
    const { data: products } = await axios.get('/api/products')
    dispatch(gotProducts(products))
  }
}

export const createProduct = product => {
  return async dispatch => {
    const { data: createdProduct } = await axios.post('/api/products', product)
    dispatch(createdProduct(createdProduct))
  }
}

// REDUCER

export default function productsReducer(state = [], action) {
  switch (action.type) {
    case GOT_PRODUCTS:
      return action.products
    case CREATED_PRODUCT:
      return [...state, action.product]
    default:
      return state
  }
}
