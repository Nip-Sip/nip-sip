import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Login, Signup } from './components/AuthForm'
import AllProducts from './components/AllProducts'
import Cart from './Cart'
import UserOption from './components/UserOption'
import AdminBoard from './components/AdminBoard'
import { me } from './store'

const Routes = () => {
  const dispatch = useDispatch()
  const id = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(me())
  }, [])

  const { isLoggedIn } = !!id
  console.log('isLoggedin:', isLoggedIn)

  return (
    <div>
      {isLoggedIn ? (
        <Switch>
          <Route path="/useroption">
            <UserOption />
          </Route>
          <Route path="/products">
            <AllProducts />
          </Route>
          <Route path="/admin">
            <AdminBoard />
          </Route>
        </Switch>
      ) : (
        <Switch>
          <Route exact path="/">
            <Login />
          </Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/signup">
            <Signup />
          </Route>
          <Route path="/products">
            <AllProducts />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
        </Switch>
      )}
    </div>
  )
}

export default Routes
