import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { createProduct, deleteProduct, updateProduct } from '../store/products'
import { getAdminInfo } from '../store/admin'
import { ContactSupportOutlined } from '@material-ui/icons'

const MyAccount = () => {
  const { email, createdAt } = useSelector(state => state.auth)
  const dispatch = useDispatch()
  const { admin, auth } = useSelector(s => s)

  useEffect(() => {
    dispatch(getAdminInfo())
  }, [])

  return (
    <div>
      <h3>Welcome, {email}</h3>
      <div id="myAccountBody">
        <h2>Account Information:</h2>
        <ul>
          <li>Email:{email}</li>
          <li>Account Created: {createdAt}</li>
        </ul>
      </div>
    </div>
  )
}

export default MyAccount
