import React, { useEffect, useState } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { authenticate } from '../store'

/**
 * COMPONENT
 */
const AuthForm = ({ type }) => {
  console.log('type', type)
  // const [name, setName] = useState('')
  // const [displayName, setDisplayName] = useState('')
  // const [error] = useState('')

  // if (type === 'login') {
  //   setName('login')
  //   setDisplayName('Login')
  // } else if (type === 'signup') {
  //   setName('signup')
  //   setDisplayName('Signup')
  // }

  // const { name, displayName, handleSubmit, error } = props
  const dispatch = useDispatch()

  const handleSubmit = evt => {
    evt.preventDefault()
    const formName = evt.target.name
    const username = evt.target.username.value
    const password = evt.target.password.value
    dispatch(authenticate(username, password, formName))
  }

  return (
    <div>
      <form
        onSubmit={handleSubmit}
        name={type === 'login' ? 'login' : 'signup'}
      >
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
          <button type="submit">{type === 'login' ? 'Login' : 'Signup'}</button>
          {/* <button type="submit">{displayName}</button> */}
        </div>
        {/* {error && error.response && <div> {error.response.data} </div>} */}
      </form>
    </div>
  )
}

/**
 * CONTAINER
 *   Note that we have two different sets of 'mapStateToProps' functions -
 *   one for Login, and one for Signup. However, they share the same 'mapDispatchToProps'
 *   function, and share the same Component. This is a good example of how we
 *   can stay DRY with interfaces that are very similar to each other!
 */

// const mapLogin = state => {
//   return {
//     name: 'login',
//     displayName: 'Login',
//     error: state.auth.error
//   }
// }

// const mapSignup = state => {
//   return {
//     name: 'signup',
//     displayName: 'Sign Up',
//     error: state.auth.error
//   }
// }

// const mapDispatch = dispatch => {
//   return {
//     handleSubmit(evt) {
//       evt.preventDefault()
//       const formName = evt.target.name
//       const username = evt.target.username.value
//       const password = evt.target.password.value
//       dispatch(authenticate(username, password, formName))
//     }
//   }
// }

// export const Login = connect(mapLogin, mapDispatch)(AuthForm)
// export const Signup = connect(mapSignup, mapDispatch)(AuthForm)

export const Login = () => <AuthForm type="login" />
export const Signup = () => <AuthForm type="signup" />
