import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../store/singleProduct'

const SingleProduct = props => {
  const quantities = [...Array(20).keys()].map(n => ++n)

  const id = props.id

  const dispatch = useDispatch()
  const { product } = useSelector(s => s)

  //placeholder submit handler for add to cart submission
  //need to call event.preventDefault() to prevent the page from refreshing
  const handleSubmit = (event) => {
    event.preventDefault()
    console.log('hello')
  }

  useEffect(() => {
    dispatch(getProduct(id))
  }, [])

  return (
    <div className="single-product">
      <div className="product-name">{product.name}</div>
      <img src={product.imageUrl} />
      <div className="product-details">
        <div>${product.price}</div>
        <div>{product.category}</div>
        <div>ABV: {Number(product.ABV) * 100}%</div>
        <div>{product.description}</div>
      </div>
      <form className="quantity-select" onSubmit={handleSubmit}>
        <label>Qty: </label>
        <select id="quantities" name="quantities">
          {quantities.map(quantity => (
            <option key={quantity} value={quantity}>
              {quantity}
            </option>
          ))}
        </select>
        <input type="submit" value="Add to Cart" />
      </form>
    </div>
  )
}

export default SingleProduct
