import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../store/products'
import { Popover } from '@material-ui/core'
import SingleProduct from './SingleProduct'
import { updateCart } from '../store/cart'

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
    dispatch(updateCart(formatCartItem(product), 1))
  }

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  const formatCartItem = (product, quantity = 1) => {
    return {
      product,
      cartItem: {
        quantity: quantity
      }
    }
  }

  return (
    <div id="allProducts">
      {products.map(product => (
        <div
          // onClick={() => openSingleProduct(event, product.id)}
          key={product.id}
        >
          <div id="productName">{product.name}</div>
          <img src={product.imageUrl} onClick={() => openSingleProduct(event, product.id)} />
          <div id="productDetails">
            ${product.price} | {product.category}
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
  )
}

export default AllProducts
