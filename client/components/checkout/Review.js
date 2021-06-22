import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../../store/cart'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'

const addresses = [
  '1 Material-UI Drive',
  'Reactville',
  'Anytown',
  '99999',
  'USA'
]
const payments = [
  { name: 'Card type', detail: 'Visa' },
  { name: 'Card holder', detail: 'Mr John Smith' },
  { name: 'Card number', detail: 'xxxx-xxxx-xxxx-1234' },
  { name: 'Expiry date', detail: '04/2024' }
]

const useStyles = makeStyles(theme => ({
  listItem: {
    padding: theme.spacing(1, 0)
  },
  total: {
    fontWeight: 700
  },
  title: {
    marginTop: theme.spacing(2)
  }
}))

export default function Review() {
  const classes = useStyles()

  const dispatch = useDispatch()
  const allCart = useSelector(state => state.cart)
  let subTotal = 0
  let tax = 0.085

  useEffect(() => {
    dispatch(getCart())

    return () => {}
  }, [])

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>
      <List disablePadding>
        {allCart.map(product => {
          const { price } = product
          const { quantity } = product.cartItem
          let totalItemPrice = price * quantity
          subTotal += totalItemPrice
          return (
            <ListItem className="review-cart-item" key={product.id}>
              <ListItemText
                primary={product.name}
                secondary={`$${product.price / 100} x ${
                  product.cartItem.quantity
                }`}
              />
              <Typography variant="body2">${totalItemPrice / 100}</Typography>
            </ListItem>
          )
        })}
        <ListItem>
          <ListItemText primary="Subtotal" />
          <Typography variant="body2" className={classes.total}>
            ${subTotal / 100}
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemText primary="Tax" />
          <Typography variant="body2" className={classes.total}>
            ${((subTotal * tax) / 100).toFixed(2)}
          </Typography>
        </ListItem>
        <ListItem>
          <ListItemText primary="Total" />
          <Typography variant="subtitle1" className={classes.total}>
            ${((subTotal * tax + subTotal) / 100).toFixed(2)}
          </Typography>
        </ListItem>
      </List>
      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Shipping
          </Typography>
          <Typography gutterBottom>John Smith</Typography>
          <Typography gutterBottom>{addresses.join(', ')}</Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          <Grid container>
            {payments.map(payment => (
              <React.Fragment key={payment.name}>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.name}</Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography gutterBottom>{payment.detail}</Typography>
                </Grid>
              </React.Fragment>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
