import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../store/products'
import { Popover } from '@material-ui/core'
import SingleProduct from './SingleProduct'

const AllProducts = () => {
  const dispatch = useDispatch()
  const { products } = useSelector(s => s)

  const [anchor, setAnchor] = useState(null)

  const openSingleProduct = (event, id) => {
    setAnchor(id)
  }

  //sample click handler for add to cart button
  //need to call event.stopPropagation() to prevent the popup from opening
  const testClick = (event) => {
    event.stopPropagation()
    console.log('hello')
  }

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  return (
    <div id="allProducts">
      {products.map(product => (
        <div
          onClick={() => openSingleProduct(event, product.id)}
          key={product.id}
        >
          <div id="productName">{product.name}</div>
          <img src={product.imageUrl} />
          <div id="productDetails">
            ${product.price} | {product.category}
          </div>
          <button type="button" id="allProductsAddCartButton" onClick={testClick}>
            {' '}
            Add to Cart
          </button>
        </div>
      ))}
      <Popover
        open={Boolean(anchor)}
        anchorEl={anchor}
        anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
        transformOrigin={{ vertical: 'center', horizontal: 'left' }}
        onClose={() => setAnchor(null)}
      >
        <SingleProduct id={anchor} />
      </Popover>
    </div>
  )
}

export default AllProducts
