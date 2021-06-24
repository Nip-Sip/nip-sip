import axios from 'axios'

const GET_SHOP_PRODUCTS = 'GET_SHOP_PRODUCTS'
const GET_SHOP_INFO = 'GET_SHOP_INFO'

const TOKEN = 'token'

const _storeProduct = prod => ({ type: GET_SHOP_PRODUCTS, prod })
const _storeInfo = info => ({ type: GET_SHOP_INFO, info })

export const getMyStore = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/api/store', {
      headers: {
        authorization: token
      }
    })
    return dispatch(_storeProduct(res.data))
  }
}

export const getShopInfo = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/api/store/info', {
      headers: {
        authorization: token
      }
    })
    return dispatch(_storeInfo(res.data))
  }
}

// REDUCER
export default function shopReducer(state = {}, action) {
  switch (action.type) {
    case GET_SHOP_PRODUCTS:
      return { ...state, prod: action.prod }
    case GET_SHOP_INFO:
      return { ...state, info: action.info }
    default:
      return state
  }
}
