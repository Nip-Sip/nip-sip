import axios from 'axios'
import updateStorage from '../../script/updateStorage'

// ACTION_TYPE
const GOT_CART = 'GOT_CART'
const ADD_TO_CART = 'ADD_TO_CART'
const DELETE_ITEM_IN_CART = 'DELETE_ITEM_IN_CART'

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

export const deleteItemInCart = (itemId) => {
  return {
    type: DELETE_ITEM_IN_CART,
    itemId
  }
}

// THUNK
export const getCart = () => {
  return async dispatch => {
    const TOKEN = localStorage.getItem('token')
    let cart
    if (TOKEN) {
      const auth = {
        headers: {
          authorization: TOKEN
        }
      }
      const { data } = await axios.get(`/api/users/cart`, auth)
      cart = data
    } else {
      const cartJSON = localStorage.getItem('cart')
      cart = cartJSON ? JSON.parse(cartJSON) : []
    }
    dispatch(gotCart(cart))
  }
}

export const updateCart = cartItem => {
  return async dispatch => {
    const TOKEN = localStorage.getItem('token')
    if (TOKEN) {
      const auth = {
        headers: {
          authorization: TOKEN
        }
      }
      const { data } = await axios.post(`/api/users/cart`, cartItem, auth)
    } else {
      const cartJSON = localStorage.getItem('cart')
      const cart = cartJSON ? JSON.parse(cartJSON) : []
      const newCart = updateStorage(cart, cartItem)
      localStorage.setItem('cart', JSON.stringify(newCart))
    }
    dispatch(addToCart(cartItem))
  }
}

export const removeItemFromCart = itemId => {
  return async dispatch => {
    const TOKEN = localStorage.getItem('token')
    if (TOKEN) {
      const auth = {
        headers: {
          authorization: TOKEN,
      }
    }
      const data  = await axios.delete(`/api/users/cart/${itemId}`, auth)
    } else {
      const cartJSON = localStorage.getItem('cart')
      const cart = cartJSON ? JSON.parse(cartJSON) : []
      const newCart = cart.filter(item => item.id !== itemId)
      localStorage.setItem('cart', JSON.stringify(newCart))
    }
    dispatch(deleteItemInCart(itemId))
  }
}



// REDUCER
export default function cartReducer(state = [], action) {
  switch (action.type) {
    case GOT_CART:
      return action.cart
    case ADD_TO_CART:
      return updateStorage(state, action.cartItem)
    case DELETE_ITEM_IN_CART:
      return state.filter(item => item.id !== action.itemId)
    default:
      return state
  }
}
