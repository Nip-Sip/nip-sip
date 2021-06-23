import axios from 'axios'

//ACTION TYPE
const CREATE_ORDER = 'CREATE_ORDER'

//ACTION CREATOR
export const createOrder = order => {
  return {
    type: CREATE_ORDER,
    order
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
    default:
      return state
  }
}
