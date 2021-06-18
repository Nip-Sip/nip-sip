import React from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink } from 'react-router-dom'
import { logout } from '../store'

const Navbar = () => {
  const dispatch = useDispatch()
  const { id: isLoggedIn } = useSelector(state => state.auth)

  return (
    <div>
      <h1>Nip Sip</h1>
      <nav>
        {!!isLoggedIn ? (
          <div>
            <NavLink to="/useroption" activeClassName="activeLink">
              User Options
            </NavLink>
            <NavLink to="/products" activeClassName="activeLink">
              All Products
            </NavLink>
            <a href="#" onClick={() => dispatch(logout())}>
              Logout
            </a>
            <Link to="/admin">Admin</Link>
          </div>
        ) : (
          <div>
            <NavLink to="/products" activeClassName="activeLink">
              All Products
            </NavLink>
            <NavLink to="/login" activeClassName="activeLink">
              Login
            </NavLink>
            <NavLink to="/signup" activeClassName="activeLink">
              Sign Up
            </NavLink>
          </div>
        )}
      </nav>
      <hr />
    </div>
  )
}

export default Navbar
