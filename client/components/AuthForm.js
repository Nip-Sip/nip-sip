import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { authenticate } from '../store'
import '../../public/style.css'
import img from '../../public/woman-bar.jpg'
// Relative path to image file from js file

function isEmail(email) {
  const regexp =
    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
  return regexp.test(email)
}

const AuthForm = ({ login }) => {
  const dispatch = useDispatch()
  const { error } = useSelector(state => state.auth)
  const [email, setEmail] = useState('')
  const [pw, setPw] = useState('')

  const handleSubmit = e => {
    e.preventDefault()
    const formName = e.target.name
    const email = e.target.email.value
    const password = e.target.password.value
    if (email.length < 3 || password.length < 3) {
      alert('Email and or password must not be less than 3')
      return
    }
    if (!isEmail(email)) {
      alert('Invalid email!')
      return
    }
    dispatch(authenticate(email, password, formName))
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
            <label htmlFor="email">Email</label>
            <input
              onChange={e => setEmail(e.target.value)}
              name="email"
              type="text"
              className={email.length >= 3 ? 'inputCorrect' : 'inputIncorrect'}
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
