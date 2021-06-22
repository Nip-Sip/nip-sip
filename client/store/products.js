import axios from 'axios'

// ACTION_TYPE
const GOT_PRODUCTS = 'GOT_PRODUCTS'
const CREATED_PRODUCT = 'CREATED PRODUCT'
export const VIEW_ALL = 'VIEW_ALL'
export const VIEW_SEARCH = 'VIEW_SEARCH'

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

export const setVisibility = (products, type = VIEW_ALL) => {
  return {
    type,
    products
  }
}

// THUNK
export const getProducts = () => {
  return async dispatch => {
    const { data: products } = await axios.get('/api/products')
    dispatch(gotProducts(products))
    dispatch(setVisibility(products))
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

// REDUCER

export function productsReducer(state = [], action) {
  switch (action.type) {
    case GOT_PRODUCTS:
      return action.products
    case CREATED_PRODUCT:
      return [...state, action.product]
    default:
      return state
  }
}

export function visibilityReducer(state=[], action) {
  switch (action.type) {
    case VIEW_ALL:
      return action.products
    case VIEW_SEARCH:
      return action.products
    default:
      return state
  }
}
