import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from '../../store/cart'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import List from '@material-ui/core/List'
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import Grid from '@material-ui/core/Grid'

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

  const shippingInfo = useSelector(state => state.order.shippingInfo)
  const paymentInfo = useSelector(state => state.order.paymentInfo)

  console.log(paymentInfo)

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
          <Typography gutterBottom>
            {shippingInfo.firstName} {shippingInfo.lastName}
          </Typography>
          <Typography gutterBottom>{shippingInfo.address1}</Typography>
          <Typography gutterBottom>{shippingInfo.address2}</Typography>
          <Typography gutterBottom>
            {shippingInfo.city}, {shippingInfo.state} {shippingInfo.zip}{' '}
            {shippingInfo.country}
          </Typography>
        </Grid>
        <Grid item container direction="column" xs={12} sm={6}>
          <Typography variant="h6" gutterBottom className={classes.title}>
            Payment details
          </Typography>
          {paymentInfo? <Grid container>
            {/* <Grid item xs={6}>
              <Typography gutterBottom>Credit Card</Typography>
            </Grid> */}
            <Grid item xs={6}>
            <Typography gutterBottom variant="subtitle2">Credit Card</Typography>
              <Typography gutterBottom>{paymentInfo.cardName}</Typography>
              <Typography gutterBottom>{paymentInfo.cardNumber}</Typography>
              <Typography gutterBottom>
                Exp. {paymentInfo.expDate}
              </Typography>
            </Grid>
          </Grid> : <span>Loading payment info</span> }
        </Grid>
      </Grid>
    </React.Fragment>
  )
}
