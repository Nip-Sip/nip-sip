import axios from 'axios'

export const GOT_USERS = 'GOT_USERS'

export const gotUsers = users => {
  return {
    type: GOT_USERS,
    users
  }
}

export const getUsers = () => {
  return async dispatch => {
    const token = window.localStorage.getItem('token')
    if (token) {
      const { data: users } = await axios.get('/api/users', {
        headers: {
          authorization: token
        }
      })

      dispatch(gotUsers(users))
    }
  }
}

export default function usersReducer(state = [], action) {
  switch (action.type) {
    case GOT_USERS:
      return action.users
    default:
      return state
  }
}
