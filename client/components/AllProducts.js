import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../store/products'

const AllProducts = () => {
  const dispatch = useDispatch()
  const { products } = useSelector(s => s)

  useEffect(() => {
    dispatch(getProducts())
  }, [])

  return (
    <div id="allProducts">
      {products &&
        products.map(product => (
          <div key={product.id}>
            <div id="productName">{product.name}</div>
            <img src={product.imageUrl} />
            <div id="productDetails">
              ${product.price} | {product.category}
            </div>
            <button type="button" id="allProductsAddCartButton">
              {' '}
              Add to Cart
            </button>
          </div>
        ))}
    </div>
  )
}

export default AllProducts
