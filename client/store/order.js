import axios from 'axios'

//ACTION TYPE
const CREATE_ORDER = 'CREATE_ORDER'
const SUBMIT_SHIPPING = 'SUBMIT_SHIPPING'
const SUBMIT_PAYMENT = 'SUBMIT_PAYMENT'

//ACTION CREATOR
export const createOrder = order => {
  return {
    type: CREATE_ORDER,
    order
  }
}

export const submitShipping = shippingInfo => {
  return {
    type: SUBMIT_SHIPPING,
    shippingInfo
  }
}

export const submitPayment = paymentInfo => {
  return {
    type: SUBMIT_PAYMENT,
    paymentInfo
  }
}

//THUNK
export const createNewOrder = order => {
  return async dispatch => {
    const TOKEN = localStorage.getItem('token')
    if (TOKEN) {
      const auth = {
        headers: {
          authorization: TOKEN
        }
      }
      const { data } = await axios.post(`/api/users/orders`, order, auth)
      dispatch(createOrder(order))
    } else {
      const { data } = await axios.post(`/api/users/guest/orders`, order)
      dispatch(createOrder(order))
    }
  }
}

//REDUCER
export default function orderReducer(state = [], action) {
  switch (action.type) {
    case CREATE_ORDER:
      return action.order
    case SUBMIT_SHIPPING:
      return {...state, shippingInfo: action.shippingInfo}
    case SUBMIT_PAYMENT:
      return {...state, paymentInfo: action.paymentInfo}
    default:
      return state
  }
}
