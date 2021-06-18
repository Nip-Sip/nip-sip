import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authenticate } from '../store'

const AuthForm = ({ login }) => {
  const dispatch = useDispatch()
  const { error } = useSelector(state => state.auth)

  const handleSubmit = e => {
    e.preventDefault()
    const formName = e.target.name
    const username = e.target.username.value
    const password = e.target.password.value
    dispatch(authenticate(username, password, formName))
  }

  return (
    <div>
      <form onSubmit={handleSubmit} name={login ? 'login' : 'signup'}>
        <div>
          <label htmlFor="username">
            <small>Username</small>
          </label>
          <input name="username" type="text" />
        </div>
        <div>
          <label htmlFor="password">
            <small>Password</small>
          </label>
          <input name="password" type="password" />
        </div>
        <div>
          <button type="submit">{login ? 'Login' : 'Sign Up'}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

export const Login = () => <AuthForm login />
export const Signup = () => <AuthForm />
