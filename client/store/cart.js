import axios from 'axios'

// ACTION_TYPE
const GOT_CART = 'GOT_CART'
const ADD_TO_CART = 'ADD_TO_CART'

// ACTION CREATOR
export const gotCart = cart => {
  return {
    type: GOT_CART,
    cart
  }
}

export const addToCart = cartItem => {
  return {
    type: ADD_TO_CART,
    cartItem
  }
}

// THUNK
export const getCart = TOKEN => {
  return async dispatch => {
    let cart
    if (TOKEN) {
      const { data } = await axios.get(`/api/users/${TOKEN}/cart`)
      cart = data
    } else {
      const cartJSON = localStorage.getItem('cart')
      cart = cartJSON ? JSON.parse(cartJSON) : []
    }
    dispatch(gotCart(cart))
  }
}

export const updateCart = (cartItem, TOKEN) => {
  let newCartItem = cartItem
  return async dispatch => {
    if (TOKEN) {
      const { data } = await axios.post(`/api/users/${TOKEN}/cart`, cartItem)
      newCartItem = data
    } else {
      const cartJSON = localStorage.getItem('cart')
      const cart = cartJSON ? JSON.parse(cartJSON) : []
      cart.push(cartItem)
      localStorage.setItem(JSON.stringify(cart))
    }
    dispatch(addToCart(newCartItem))
  }
}

// REDUCER
export default function cartReducer(state = [], action) {
  switch (action.type) {
    case GOT_CART:
      return action.cart
    default:
      return state
  }
}
