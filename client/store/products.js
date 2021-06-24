import axios from 'axios'

// ACTION_TYPE
export const GOT_PRODUCTS = 'GOT_PRODUCTS'
export const CREATED_PRODUCT = 'CREATED_PRODUCT'
export const UPDATED_PRODUCT = 'UPDATED_PRODUCT'
export const DELETED_PRODUCT = 'DELETED_PRODUCT'

export const BEST_SELLERS = 'BEST_SELLERS'
export const HIGHEST_PRICE = 'HIGHEST_PRICE'
export const LOWEST_PRICE = 'LOWEST_PRICE'
export const ALPHABETICAL_ASC = 'ALPHABETICAL_ASC'
export const ALPHABETICAL_DEC = 'ALPHABETICAL_DEC'

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

export const setVisibility = (products, type = BEST_SELLERS) => {
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
    try {
      console.log(product)
      const token = window.localStorage.getItem('token')

      if (token) {
        const { data: updatingProduct } = await axios.put(
          `/api/products/${product.productId}`,
          product,
          {
            headers: {
              authorization: token
            }
          }
        )

        dispatch(updatedProduct(updatingProduct))
      }
    } catch (error) {
      console.error(error)
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
      return [...state, action.product]
    case DELETED_PRODUCT:
      return state.filter(product => product.id !== action.product.id)
    default:
      return state
  }
}

export function visibilityReducer(state = [], action) {
  switch (action.type) {
    case BEST_SELLERS:
      return [...action.products.sort((a, b) => a.id - b.id)]
    case HIGHEST_PRICE:
      return [...action.products.sort((a, b) => b.price - a.price)]
    case LOWEST_PRICE:
      return [...action.products.sort((a, b) => a.price - b.price)]
    case ALPHABETICAL_DEC:
      return [...action.products.sort((a, b) => a.name < b.name ? 1 : -1)]
    case ALPHABETICAL_ASC:
      return [...action.products.sort((a, b) => b.name < a.name ? 1 : -1)]
    default:
      return state
  }
}
