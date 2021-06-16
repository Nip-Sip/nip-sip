import axios from 'axios'

//ACTION TYPE
const GOT_PRODUCT = 'GOT_PRODUCT'

//ACTION CREATOR
export const gotProduct = product => {
  return {
    type: GOT_PRODUCT,
    product
  }
}

//THUNK
export const getProduct = (id) => {
  return async (dispatch) => {
    try {
      const { data } = await axios.get(`/api/products/${id}`)
      dispatch(gotProduct(data))
    } catch (error) {
      console.log(error)
    }
  }
}

//REDUCER
export default function productReducer(state = [], action) {
  switch (action.type) {
    case GOT_PRODUCT:
      return action.product
    default:
      return state
  }
}
