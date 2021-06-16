import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../store/products'
import { Popover } from '@material-ui/core'

const AllProducts = () => {
  const dispatch = useDispatch()
  const { products } = useSelector(s => s)

  const [anchor, setAnchor] = useState(null)

  const openSingleProduct = event => {
    setAnchor(event.target)
  }

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  return (
    <div id="allProducts">
      {products.map(product => (
        <div key={product.id}>
          <div id="productName">{product.name}</div>
          <img src={product.imageUrl} onClick={openSingleProduct} />
          <div id="productDetails">
            ${product.price} | {product.category}
          </div>
          <button type="button" id="allProductsAddCartButton">
            {' '}
            Add to Cart
          </button>
          <Popover
            open={Boolean(anchor)}
            anchorEl={anchor}
            anchorOrigin={{ vertical: 'center', horizontal: 'right' }}
            transformOrigin={{ vertical: 'center', horizontal: 'left' }}
            onClose={() => setAnchor(null)}
          >
            Hello
          </Popover>
        </div>
      ))}
    </div>
  )
}

export default AllProducts
