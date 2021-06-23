import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCart, updateCart, removeItemFromCart } from '../store/cart'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import Paper from '@material-ui/core/Paper'
import Container from '@material-ui/core/Container'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Divider from '@material-ui/core/Divider'
import Button from '@material-ui/core/Button'
import { NavLink } from 'react-router-dom'
import { makeStyles } from '@material-ui/core/styles'

const Cart = () => {
  const dispatch = useDispatch()
  const allCart = useSelector(state => state.cart)
  const [quantityChange, setQuantity] = useState({})
  let subTotal = 0
  let tax = 0.085

  useEffect(() => {
    dispatch(getCart())

    return () => {}
  }, [])

  const useStyles = makeStyles(theme => ({
    buttons: {
      display: 'flex',
      justifyContent: 'flex-end'
    },
    button: {
      display: 'flex',
      marginTop: theme.spacing(3),
      marginLeft: theme.spacing(1),
      justifyContent: 'flex-end'
    }
  }))
  const classes = useStyles()

  const handleChange = e => {
    setQuantity({
      ...quantityChange,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdate = (event, item) => {
    const quantity = +quantityChange[item.id]
    if (quantity) {
      dispatch(updateCart(formatCartItem(item, quantity)))
      setQuantity({
        ...quantityChange,
        [item.id]: undefined
      })
    }
    if (quantity === 0) dispatch(removeItemFromCart(item.id))
  }

  const handleDelete = itemId => {
    dispatch(removeItemFromCart(itemId))
  }

  const formatCartItem = (item, quantity) => {
    return {
      ...item,
      cartItem: {
        quantity: quantity,
        inCart: true
      }
    }
  }

  return (
    <div className='cart'>
      <div className="cart-container">
        <Container className="cart-left" component={Paper}>
          <List>
            {allCart.map((item, i) => {
              const { id, name, price, imageUrl } = item
              const { quantity } = item.cartItem
              const divider = i !== allCart.length - 1 ? '' : 'none'
              const inputColor =
                quantityChange[id] && quantityChange[id] !== id
                  ? 'red'
                  : 'lightGrey'

              return (
                <>
                  <ListItem key={id} className="cart-item">
                    <img style={{ maxHeight: '100px' }} src={imageUrl} />
                    <div>
                      <ListItemText
                        primary={name}
                        secondary={`$${price / 100}`}
                      />
                      <input
                        name={id}
                        type="number"
                        min="0"
                        step="1"
                        defaultValue={quantity}
                        onChange={handleChange}
                        style={{ width: '50px', borderColor: inputColor }}
                      />{' '}
                      <button onClick={() => handleUpdate(event, item)}>
                        Update
                      </button>{' '}
                      <button onClick={() => handleDelete(id)}>Delete</button>
                    </div>
                  </ListItem>
                  <Divider
                    variant="middle"
                    component="li"
                    style={{ display: divider }}
                  />
                </>
              )
            })}
          </List>
        </Container>
        <Container className="cart-right">
          <TableContainer component={Paper}>
            <Table aria-label="spanning table">
              <TableHead>
                <TableRow>
                  <TableCell align="center" colSpan={4}>
                    Cart Summary
                  </TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Nip</TableCell>
                  <TableCell align="left">Price</TableCell>
                  <TableCell align="center">Qty</TableCell>
                  <TableCell align="right">Total</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {allCart.map(item => {
                  const { id, name, price } = item
                  const { quantity } = item.cartItem
                  let totalItemPrice = price * quantity
                  subTotal += totalItemPrice
                  return (
                    <TableRow key={id} className="cart-item-summary">
                      <TableCell>{name}</TableCell>
                      <TableCell>{`$${(price / 100).toFixed(2)}`}</TableCell>
                      <TableCell align="center">X {quantity}</TableCell>
                      <TableCell align="right">{`$${(
                        totalItemPrice / 100
                      ).toFixed(2)}`}</TableCell>
                    </TableRow>
                  )
                })}
                <TableRow>
                  <TableCell rowSpan={3} />
                  <TableCell align="left" colSpan={2}>
                    Subtotal:
                  </TableCell>
                  <TableCell align="right">{`$${(subTotal / 100).toFixed(
                    2
                  )}`}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left">Tax:</TableCell>
                  <TableCell align="center">{`${tax * 100}%`}</TableCell>
                  <TableCell align="right">{`$${(
                    (tax * subTotal) /
                    100
                  ).toFixed(2)}`}</TableCell>
                </TableRow>
                <TableRow>
                  <TableCell align="left" colSpan={2}>
                    Total:
                  </TableCell>
                  <TableCell align="right">{`$${(
                    (subTotal + tax * subTotal) /
                    100
                  ).toFixed(2)}`}</TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </div>
      <NavLink to="/checkout" activeClassName="activeLink">
        <Button variant="contained" color="primary" className={classes.button}>
          Checkout
        </Button>
      </NavLink>
    </div>
  )
}

export default Cart
