import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProduct } from '../store/singleProduct'
import { updateCart } from '../store/cart'

const SingleProduct = props => {
  const id = props.id

  const dispatch = useDispatch()
  const { product } = useSelector(s => s)

  const [quantity, setQuantity] = useState("")

  const handleChange = (event) => {
    setQuantity(event.target.value)
  }

  const addToCart = (event, product) => {
    event.preventDefault()
    dispatch(updateCart(formatCartItem(product, quantity)))
  }

  useEffect(() => {
    dispatch(getProduct(id))
  }, [])

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
      <img src={product.imageUrl} />
      <div className="product-details">
        <div>${product.price}</div>
        <div>{product.category}</div>
        <div>ABV: {Number(product.ABV) * 100}%</div>
        <div>{product.description}</div>
      </div>
      <form className="quantity-select" onSubmit={() => addToCart(event, product)}>
        <label>Qty: </label>
        <input
          type="number"
          min="1"
          step="1"
          value={quantity}
          onChange={handleChange}
          required
        />
        <input type="submit" value="Add to Cart" />
      </form>
    </div>
  )
}

export default SingleProduct
