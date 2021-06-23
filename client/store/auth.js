import axios from 'axios'
import history from '../history'

const TOKEN = 'token'

/**
 * ACTION TYPES
 */
const SET_AUTH = 'SET_AUTH'
const SET_FAV = 'SET_FAV'

/**
 * ACTION CREATORS
 */
const setAuth = auth => ({ type: SET_AUTH, auth })
const setFav = fav => ({ type: SET_FAV, fav })
/**
 * THUNK CREATORS
 */
export const me = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/auth/me', {
      headers: {
        authorization: token
      }
    })
    return dispatch(setAuth(res.data))
  }
}

export const authenticate = (email, password, method) => async dispatch => {
  try {
    const res = await axios.post(`/auth/${method}`, { email, password })
    window.localStorage.setItem(TOKEN, res.data.token)
    dispatch(me())
    history.push('/products')
  } catch (authError) {
    return dispatch(setAuth({ error: authError }))
  }
}

export const logout = () => {
  window.localStorage.removeItem(TOKEN)
  history.push('/login')
  return {
    type: SET_AUTH,
    auth: {}
  }
}

export const getFavItem = () => async dispatch => {
  const token = window.localStorage.getItem(TOKEN)
  if (token) {
    const res = await axios.get('/api/users/infos', {
      headers: {
        authorization: token
      }
    })
    return dispatch(setFav(res.data))
  }
}

/**
 * REDUCER
 */
export default function (state = {}, action) {
  switch (action.type) {
    case SET_AUTH:
      return action.auth
    case SET_FAV:
      return { ...state, fav: action.fav }
    default:
      return state
  }
}
