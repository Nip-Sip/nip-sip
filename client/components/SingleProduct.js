import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateCart } from '../store/cart'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import Typography from '@material-ui/core/Typography'

const SingleProduct = props => {
  const product = props.product

  const dispatch = useDispatch()

  const useStyles = makeStyles({
    root: {
      width: 300,
      margin: 5
    },
    media: {
      height: 500
    }
  })

  const [quantity, setQuantity] = useState(1)

  const classes = useStyles()

  const handleChange = event => {
    setQuantity(Number(event.target.value))
  }

  const addToCart = (event, product) => {
    event.preventDefault()
    dispatch(updateCart(formatCartItem(product, quantity)))
  }

  const formatCartItem = (product, quantity) => {
    return {
      ...product,
      cartItem: {
        quantity: quantity
      }
    }
  }

  return (
    <Card className="single-product">
      <img id="productImage" src={product.imageUrl} />
      <CardContent className="single-product-content">
        <Typography gutterBottom variant="h5" component="h2">
          {product.name}
        </Typography>
        <Typography
          gutterBottom
          variant="body2"
          color="textSecondary"
          component="p"
        >
          ${product.price / 100}
        </Typography>
        <Typography
          gutterBottom
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {product.category}
        </Typography>
        <Typography
          gutterBottom
          variant="body2"
          color="textSecondary"
          component="p"
        >
          {product.description}
        </Typography>
        <Typography
          gutterBottom
          variant="body2"
          color="textSecondary"
          component="p"
        >
          ABV: {product.ABV * 100}%
        </Typography>
        <form
          className="quantity-select"
          onSubmit={() => addToCart(event, product)}
        >
          <div id="single-product-quantity">
            <label style={{ marginRight: '3px', color: 'gray' }}>Qty: </label>
            <input
              type="number"
              min="1"
              step="1"
              onChange={handleChange}
              defaultValue="1"
              required
            />
            <input type="submit" value="Add to Cart" />
          </div>
        </form>
      </CardContent>
    </Card>
  )
}

export default SingleProduct
