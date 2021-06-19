import axios from 'axios'
// import User from '../../server/db/models/user'

const GET_ADMIN_INFO = 'GET_ADMIN_INFO'

const _getAdminInfo = adminInfo => ({ type: GET_ADMIN_INFO, adminInfo })

const initialState = []

export const getAdminInfo = () => {
  return async dispatch => {
    try {
      const token = window.localStorage.getItem('token')
      if (token) {
        const { data } = await axios.get('/auth/admin', {
          headers: {
            authorization: token
          }
        })
        dispatch(_getAdminInfo(data))
      }
    } catch (err) {
      console.log('Not an admin!')
    }
  }
}

export default function (state = initialState, action) {
  switch (action.type) {
    case GET_ADMIN_INFO:
      return action.adminInfo
    case 'SET_AUTH':
      return initialState
    default:
      return state
  }
}
