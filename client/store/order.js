import axios from 'axios'

//ACTION TYPE
const CREATE_ORDER = 'CREATE_ORDER'
const SUBMIT_SHIPPING = 'SUBMIT_SHIPPING'
const SUBMIT_PAYMENT = 'SUBMIT_PAYMENT'

//ACTION CREATOR
export const createOrder = (order, orderId) => {
  return {
    type: CREATE_ORDER,
    order: { ...order, id: orderId }
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
    let orderId
    const TOKEN = localStorage.getItem('token')
    if (TOKEN) {
      const auth = {
        headers: {
          authorization: TOKEN
        }
      }
      const { data } = await axios.post(`/api/users/orders`, order, auth)
      orderId = data.id
    } else {
      const { data } = await axios.post(`/api/users/guest/orders`, order)
      orderId = data.id
    }
    console.log(order)
    dispatch(createOrder(order, orderId))
  }
}

//REDUCER
export default function orderReducer(state = [], action) {
  switch (action.type) {
    case CREATE_ORDER:
      return action.order
    case SUBMIT_SHIPPING:
      return { ...state, shippingInfo: action.shippingInfo }
    case SUBMIT_PAYMENT:
      return { ...state, paymentInfo: action.paymentInfo }
    default:
      return state
  }
}
