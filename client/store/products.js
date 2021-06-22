import axios from 'axios'

// ACTION_TYPE
export const GOT_PRODUCTS = 'GOT_PRODUCTS'
export const CREATED_PRODUCT = 'CREATED PRODUCT'
export const UPDATED_PRODUCT = 'UPDATED PRODUCT'
export const DELETED_PRODUCT = 'DELETED PRODUCT'

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

export const updatedProduct = product => {
  return {
    type: UPDATED_PRODUCT,
    product
  }
}

export const deletedProduct = product => {
  return {
    type: DELETED_PRODUCT,
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

export const updateProduct = product => {
  return async dispatch => {
    const token = window.localStorage.getItem('token')
    if (token) {
      const { data: updatingProduct } = await axios.put(
        `/api/products/${id}`,
        product,
        {
          headers: {
            authorization: token
          }
        }
      )
      dispatch(updatedProduct(updatingProduct))
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
export function productsReducer(state = [], action) {
  switch (action.type) {
    case GOT_PRODUCTS:
      return action.products
    case CREATED_PRODUCT:
      return [...state, action.product]

    case UPDATED_PRODUCT:
      return action.product
    case DELETED_PRODUCT:
      return state.filter(product => product.id !== action.product.id)
    default:
      return state
  }
}

export function visibilityReducer(state = [], action) {
  switch (action.type) {
    case VIEW_ALL:
      return action.products
    case VIEW_SEARCH:
      return action.products
    default:
      return state
  }
}
