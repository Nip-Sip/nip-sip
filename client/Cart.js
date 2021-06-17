import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCart } from './store/cart'

const Cart = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.auth.id)
  const allCart = useSelector(state => state.cart)
  const [cart, setCart] = useState([])
  let totalPrice = 0

  useEffect(() => {
    dispatch(getCart(2))
    //setCart(cartFetch)
    return () => {}
  }, [])

  return (
    <div className="cart-container">
      <div className="cart-left">
        {allCart.map(item => {
          const { id, name, price, imageUrl } = item
          const { quantity } = item.cartItem
          return (
            <div key={id} className="cart-item">
              <img src={imageUrl} />
              <div>
                <span>{name}</span>
                <input
                  type="number"
                  min="0"
                  step="1"
                  defaultValue={quantity}
                />{' '}
                <button>Update</button> <button>Delete</button>
              </div>
              <div>
                <span>{`$${price}`}</span>
              </div>
            </div>
          )
        })}
      </div>
      <div className="cart-right">
        <table className="summary">
          <tr>
            <th>Nip</th>
            <th>Price</th>
            <th>Qty</th>
            <th>Total Item Price</th>
          </tr>
          {allCart.map(item => {
            const { id, name, price } = item
            const { quantity } = item.cartItem
            let totalItemPrice = (price * quantity).toFixed(2)
            totalPrice += price * quantity
            return (
              <tr key={id} className="cart-item-summary">
                <td>{name}</td>
                <td>{`$${price}`}</td>
                <td>X {quantity}</td>
                <td>{`$${totalItemPrice}`}</td>
              </tr>
            )
          })}
          <tr>
          <th>Total: </th>
          <td>{`$${totalPrice.toFixed(2)}`}</td>
          </tr>
        </table>
      </div>
    </div>
  )
}

export default Cart
