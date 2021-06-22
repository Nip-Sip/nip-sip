import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { Popover } from '@material-ui/core'
import SingleProduct from './SingleProduct'
import { updateCart } from '../store/cart'
// Material UI Added
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

function ProductCard({ product }) {
  const dispatch = useDispatch()

  const useStyles = makeStyles({
    root: {
      width: 345,
      margin: 5
    },
    media: {
      height: 285
    }
  })

  const [anchor, setAnchor] = useState(null)
  //const [product, setProduct] = useState(null)

  const classes = useStyles()

  const openSingleProduct = event => {
    setAnchor(event.target)
  }

  const addToCart = (event, product) => {
    dispatch(updateCart(formatCartItem(product)))
  }

  const formatCartItem = (product, quantity = 1) => {
    return {
      ...product,
      cartItem: {
        quantity: quantity
      }
    }
  }

  return (
    <React.Fragment>
      <Card key={product.id} className={classes.root}>
        <CardActionArea onClick={openSingleProduct}>
          <CardMedia className={classes.media} image={product.imageUrl} />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {product.name}
            </Typography>
            <Typography variant="body2" color="textSecondary" component="p">
              ${product.price / 100} || {product.category}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions>
          <Button size="small" color="primary">
            Share
          </Button>
          <Button
            name="all-products-add-to-cart"
            size="small"
            color="primary"
            onClick={() => addToCart(event, product)}
          >
            Add to Cart
          </Button>
        </CardActions>
      </Card>
      <Popover
        className="single-product-popover"
        open={Boolean(anchor)}
        anchorEl={anchor}
        anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
        transformOrigin={{ vertical: 'center', horizontal: 'center' }}
        onClose={() => setAnchor(null)}
      >
        <SingleProduct product={product} />
      </Popover>
    </React.Fragment>
  )
}

export default ProductCard
