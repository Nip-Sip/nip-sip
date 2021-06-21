import React from 'react'

const Checkout = () => {
  return (
    <div className='checkout-container'>
      <div className='billing-info'>
        Billing Information
        <form>
          <input type="string" placeholder="Name on card" />
          <input type="string" placeholder="Billing address line 1" />
          <input type-="string" placeholder="Billing address line 2" />
          <input type="string" placeholder="Credit card number" />
          <input type="number" placeholder="CVV" />
          <input type="string" placeholder="Expiration date MM/YYYY" />
        </form>
      </div>
      <div className='shipping-info'>
        Shipping Information
        <form>
          <input type="string" placeholder="Name" />
          <input type="string" placeholder="Address line 1" />
          <input type-="string" placeholder="Address line 2" />
          <input type="string" placeholder="ZIP" />
          <input type="number" placeholder="State" />
          <input type="string" placeholder="Expiration date MM/YYYY" />
        </form>
      </div>
      <div className="cart-summary">
        Cart Summary will go here
      </div>
    </div>
  )
}

export default Checkout
