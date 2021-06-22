import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../store/products'
import { Popover } from '@material-ui/core'
import SingleProduct from './SingleProduct'
import Search from './Search'
import { updateCart, getCart } from '../store/cart'
// Material UI Added
import Carousel from './Carousel'
import { makeStyles } from '@material-ui/core/styles'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import Button from '@material-ui/core/Button'
import Typography from '@material-ui/core/Typography'

// Styles used
const useStyles = makeStyles({
  root: {
    maxWidth: 345
  },
  media: {
    height: 140
  }
})

// function ProductCard({ product }) {
//   const classes = useStyles()

//   return (
//     <Card key={product.id} className={classes.root}>
//       <CardActionArea>
//         <CardMedia className={classes.media} image={product.imageUrl} />
//         <CardContent>
//           <Typography gutterBottom variant="h5" component="h2">
//             {product.name}
//           </Typography>
//           <Typography variant="body2" color="textSecondary" component="p">
//             {product.description}
//           </Typography>
//         </CardContent>
//       </CardActionArea>
//       <CardActions>
//         <Button size="small" color="primary">
//           Share
//         </Button>
//         <Button size="small" color="primary">
//           Add to Cart
//         </Button>
//       </CardActions>
//     </Card>
//   )
// }

const AllProducts = () => {
  const dispatch = useDispatch()
  const { products } = useSelector(s => s)

  const [anchor, setAnchor] = useState(null)
  const [id, setId] = useState(null)

  const openSingleProduct = (event, id) => {
    setAnchor(event.target)
    setId(id)
  }

  //sample click handler for add to cart button
  //need to call event.stopPropagation() to prevent the popup from opening
  const addToCart = (event, product) => {
    event.stopPropagation()
    dispatch(updateCart(formatCartItem(product)))
  }

  useEffect(() => {
    dispatch(getProducts())
    dispatch(getCart())
  }, [])

  const formatCartItem = (product, quantity = 1) => {
    return {
      ...product,
      cartItem: {
        quantity: quantity
      }
    }
  }

  return (
    <>
      {/* <Carousel /> */}
      {/* Docs:
			https://www.npmjs.com/package/react-responsive-carousel */}
      <Search />
      <div id="allProducts">
        {products.map(product => (
          <div
            className="product-card"
            // onClick={() => openSingleProduct(event, product.id)}
            key={product.id}
          >
            {/* <ProductCard product={product} /> */}
            <div id="productName">{product.name}</div>
            <img
              src={product.imageUrl}
              onClick={() => openSingleProduct(event, product.id)}
            />
            <div id="productDetails">
              ${product.price / 100} | {product.category}
            </div>
            <button
              type="button"
              id="allProductsAddCartButton"
              onClick={() => addToCart(event, product)}
            >
              {' '}
              Add to Cart
            </button>
          </div>
        ))}
        <Popover
          className="single-product-popover"
          open={Boolean(anchor)}
          anchorEl={anchor}
          anchorOrigin={{ vertical: 'center', horizontal: 'center' }}
          transformOrigin={{ vertical: 'center', horizontal: 'center' }}
          onClose={() => setAnchor(null)}
        >
          <SingleProduct id={id} />
        </Popover>
      </div>
    </>
  )
}

export default AllProducts
