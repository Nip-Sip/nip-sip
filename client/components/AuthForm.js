import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authenticate } from '../store'
import '../../public/style.css'
import img from '../../public/woman-bar.jpg'
// Relative path to image file from js file

const AuthForm = ({ login }) => {
  const dispatch = useDispatch()
  const { error } = useSelector(state => state.auth)
  const [user, setUser] = useState('')
  const [pw, setPw] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    const formName = e.target.name
    const username = e.target.username.value
    const password = e.target.password.value
    if (formName.length < 3 || password.length < 3) {
      alert('Invalid formname or password.')
      return
    }
    dispatch(authenticate(username, password, formName))
  }

  return (
    <div className="authForm enableBlur">
      <div className="bar-lady"></div>
      <form
        className="auth-form"
        onSubmit={handleSubmit}
        name={login ? 'login' : 'signup'}
        className="opacity"
        id="authform"
      >
        <h1>{login ? 'Login' : 'Signup'}</h1>
        <p className="s-e">An adventure of your life time awaits...</p>
        <div id="subauth">
          <div>
            <label htmlFor="username">Username</label>
            <input
              onChange={e => setUser(e.target.value)}
              name="username"
              type="text"
              className={user.length >= 3 ? 'inputCorrect' : 'inputIncorrect'}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              onChange={e => setPw(e.target.value)}
              name="password"
              type="password"
              className={pw.length >= 3 ? 'inputCorrect' : 'inputIncorrect'}
            />
          </div>
          <button type="submit">{login ? 'Login' : 'Sign Up'}</button>
        </div>
        {error && error.response && <div> {error.response.data} </div>}
      </form>
    </div>
  )
}

export const Login = () => <AuthForm login />
export const Signup = () => <AuthForm />
