import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { updateCart } from '../store/cart'

const SingleProduct = props => {
  const product = props.product

  const dispatch = useDispatch()

  const [quantity, setQuantity] = useState(1)

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
    <div className="single-product">
      <div className="product-name">{product.name}</div>
      <img id="productImage" src={product.imageUrl} />
      <div className="product-details">
        <div>${product.price / 100}</div>
        <div>{product.category}</div>
        <div>ABV: {Number(product.ABV) * 100}%</div>
        <div>{product.description}</div>
      </div>
      <form
        className="quantity-select"
        onSubmit={() => addToCart(event, product)}
      >
        <div id="single-product-quantity">
          <label>Qty: </label>
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
    </div>
  )
}

export default SingleProduct
