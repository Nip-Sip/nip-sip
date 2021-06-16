import axios from 'axios'

// ACTION_TYPE
const GOT_PRODUCTS = 'GOT_PRODUCTS'

// ACTION CREATOR
export const gotProducts = products => {
  return {
    type: GOT_PRODUCTS,
    products
  }
}

// THUNK
export const getProducts = () => {
  return async dispatch => {
    const { data: products } = await axios.get('/api/products')
    console.log('thunk')
    dispatch(gotProducts(products))
  }
}

// REDUCER

export default function productsReducer(state = [], action) {
  switch (action.type) {
    case GOT_PRODUCTS:
      return action.products

    default:
      return state
  }
}
