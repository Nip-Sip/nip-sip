import axios from 'axios'

const GET_ADMIN_INFO = 'GET_ADMIN_INFO'

const _getAdminInfo = adminInfo => ({ type: GET_ADMIN_INFO, adminInfo })

export const getAdminInfo = () => {
  return async dispatch => {
    try {
      const token = window.localStorage.getItem('token')
      if (token) {
        const res = await axios.get('/auth/admin', {
          headers: {
            authorization: token
          }
        })
        console.log('runs on admin error...')
        dispatch(_getAdminInfo(['admin', 'eyes', 'only']))
      }
    } catch (err) {
      console.log('Not an admin!')
    }
  }
}

export default function (state = [], action) {
  switch (action.type) {
    case GET_ADMIN_INFO:
      return action.adminInfo
    default:
      return state
  }
}
