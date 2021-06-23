import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { createProduct, deleteProduct, updateProduct } from '../store/products'
import { getAdminInfo } from '../store/admin'
import { ContactSupportOutlined } from '@material-ui/icons'

const MyAccount = () => {
  const { email, createdAt, address, zipcode, firstName, lastName } =
    useSelector(state => state.auth)
  const dispatch = useDispatch()
  const { admin, auth } = useSelector(s => s)

  useEffect(() => {
    dispatch(getAdminInfo())
  }, [])

  return (
    <div id="myAccountBody">
      <h3>
        Welcome, {firstName} {lastName}!
      </h3>
      <div>
        <h1>Account Information:</h1>
        <ul>
          <li>Email: {email}</li>
          <li>
            Account Created: {new Date(createdAt).toLocaleDateString('en-US')}
          </li>
          <li>Address: {address}</li>
          <li>Zipcode: {zipcode}</li>
        </ul>
      </div>
      <h1>Order History</h1>
      <p>Get My Order History!</p>
      <h1>My Cart</h1>
      <p>Query my Cart!</p>
    </div>
  )
}

export default MyAccount
