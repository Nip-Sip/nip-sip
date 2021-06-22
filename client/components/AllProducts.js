import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../store/products'
import { Popover } from '@material-ui/core'
import SingleProduct from './SingleProduct'
import Search from './Search'
import { updateCart, getCart } from '../store/cart'

const AllProducts = () => {
  const dispatch = useDispatch()
  const { products } = useSelector(s => s)

  const [anchor, setAnchor] = useState(null)
  const [product, setProduct] = useState(null)

  const openSingleProduct = (event, product) => {
    if (event.target.name !== 'all-products-add-to-cart') {
      //don't open the popover if the button is clicked
      setAnchor(event.target)
      setProduct(product)
    }
  }

  const addToCart = (event, product) => {
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
      <Search />
      <div id="allProducts">
        {products.map(product => (
          <div
            className="product-card"
            onClick={() => openSingleProduct(event, product)}
            key={product.id}
          >
            <div id="productName">{product.name}</div>
            <img src={product.imageUrl} />
            <div id="productDetails">
              ${product.price / 100} | {product.category}
            </div>
            <button
              type="button"
              name="all-products-add-to-cart"
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
          <SingleProduct product={product} />
        </Popover>
      </div>
    </>
  )
}

export default AllProducts
