import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCart, updateCart, removeItemFromCart } from '../store/cart'

const Cart = () => {
  const dispatch = useDispatch()
  const loggedInUser = useSelector(state => state.auth.id)
  const auth = useSelector(state => state.auth)
  const allCart = useSelector(state => state.cart)
  const [quantityChange, setQuantity] = useState({})
  let totalPrice = 0
  console.log('auth', auth)
  console.log('loggedinUser', loggedInUser)

  useEffect(() => {
    dispatch(getCart())

    return () => {}
  }, [])

  const handleChange = (e) => {
    setQuantity({
      ...quantityChange,
      [e.target.name]: e.target.value
    })
  }

  const handleUpdate = (event, item) => {
    const quantity = quantityChange[item.id]
    if (quantity) {
    dispatch(updateCart(formatCartItem(item, quantity)))
    setQuantity({
      ...quantityChange,
      [item.id]: undefined
    })
    }
  }

  const handleDelete = (itemId) => {
    dispatch(removeItemFromCart(itemId))
  }

  const formatCartItem = (item, quantity) => {
    return {
     ...item,
     cartItem: {
       quantity: quantity,
       inCart: true
     }
    }
  }

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
                  name={id}
                  type="number"
                  min="0"
                  step="1"
                  defaultValue={quantity}
                  onChange={handleChange}
                />{' '}
                <button onClick={() => handleUpdate(event, item)}>Update</button> <button onClick={() => handleDelete(id)}>Delete</button>
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
          <thead>
            <tr>
              <th>Nip</th>
              <th>Price</th>
              <th>Qty</th>
              <th>Total Item Price</th>
            </tr>
          </thead>
          <tbody>
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
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Cart
