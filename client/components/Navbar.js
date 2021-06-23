import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { NavLink, Link } from 'react-router-dom'
import { logout } from '../store'
import Badge from '@material-ui/core/Badge'
import { withStyles } from '@material-ui/core/styles'
import IconButton from '@material-ui/core/IconButton'
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart'
import countAllQty from '../../script/countAllQty'
import '../../public/style.css'
import { motion } from 'framer-motion'
import { getAdminInfo } from '../store/admin'

const Navbar = () => {
  const dispatch = useDispatch()
  const { id: isLoggedIn } = useSelector(state => state.auth)
  const { admin, auth } = useSelector(s => s)
  const cart = useSelector(state => state.cart)

  useEffect(() => {
    dispatch(getAdminInfo())
  }, [])

  const StyledBadge = withStyles(theme => ({
    badge: {
      right: -3,
      top: 13,
      border: `2px solid ${theme.palette.background.paper}`,
      padding: '0 4px'
    }
  }))(Badge)

  return (
    <div style={{ position: 'relative' }}>
      <nav>
        {!!isLoggedIn ? (
          <div>
            <NavLink to="/myAccount" activeClassName="activeLink">
              My Account
            </NavLink>
            <NavLink to="/products" activeClassName="activeLink">
              All Products
            </NavLink>
            <a href="#" onClick={() => dispatch(logout())}>
              Logout
            </a>
            <NavLink to="/admin">Admin</NavLink>
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
        <div>
          {admin.length ? (
            <NavLink to="/adminOptions" activeClassName="activeLink">
              Admin Options
            </NavLink>
          ) : null}
          <NavLink to="/cart" activeClassName='activeLink"'>
            <IconButton aria-label="cart">
              <StyledBadge badgeContent={countAllQty(cart)} color="primary">
                <ShoppingCartIcon />
              </StyledBadge>
            </IconButton>
          </NavLink>
        </div>
      </nav>
      <Link to="/">
        <motion.div
          animate={{ scale: [1, 1.1, 1] }}
          transition={{ ease: 'easeOut', duration: 4, repeat: Infinity }}
          className="title"
        >
          Nip Sip
        </motion.div>
      </Link>
    </div>
  )
}

export default Navbar
