import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Route, Switch, Redirect } from 'react-router-dom'
import { Login, Signup } from './components/AuthForm'
import AllProducts from './components/AllProducts'
import Cart from './components/Cart'
import UserOption from './components/UserOption'
import AdminBoard from './components/AdminBoard'
import { me } from './store'

const Routes = () => {
  const dispatch = useDispatch()
  const { id: isLoggedIn } = useSelector(state => state.auth)

  useEffect(() => {
    dispatch(me())
  }, [])

  console.log('isLoggedin:', isLoggedIn)

  return (
    <div>
      {!!isLoggedIn ? (
        <Switch>
          <Route exact path="/useroption">
            <UserOption />
          </Route>
          <Route exact path="/products">
            <AllProducts />
          </Route>
          <Route path="/cart">
            <Cart />
          </Route>
          <Route exact path="/admin">
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
