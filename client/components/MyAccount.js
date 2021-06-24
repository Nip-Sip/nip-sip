import React, { useState, useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { createProduct, deleteProduct, updateProduct } from '../store/products'
import { getAdminInfo } from '../store/admin'
import { ContactSupportOutlined } from '@material-ui/icons'
import { motion } from 'framer-motion'
import MyStore from './MyStore'

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
      <h1 style={{ textAlign: 'center', fontStyle: 'italic' }}>
        Welcome, {firstName} {lastName}! <WavingHand />
      </h1>
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
      <MyStore />
    </div>
  )
}

export default MyAccount

function WavingHand() {
  return (
    <motion.div
      style={{
        marginBottom: '-20px',
        marginRight: '-45px',
        paddingBottom: '20px',
        paddingRight: '45px',
        display: 'inline-block'
      }}
      animate={{ rotate: 20 }}
      transition={{
        yoyo: Infinity,
        from: 0,
        duration: 0.2,
        ease: 'easeInOut',
        type: 'tween'
      }}
    >
      👋
    </motion.div>
  )
}
