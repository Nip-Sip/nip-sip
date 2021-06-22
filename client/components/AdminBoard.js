import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminInfo } from '../store/admin'
import AddressForm from './checkout/AddressForm'
import Checkout from './checkout/Checkout'
import PaymentForm from './checkout/PaymentForm'
import Review from './checkout/Review'
import UserFav from './UserFavs'

const AdminBoard = () => {
  const dispatch = useDispatch()
  const { admin, auth } = useSelector(s => s)

  useEffect(() => {
    dispatch(getAdminInfo())
  }, [])

  return (
    <div>
      <h1>Logged in but not an Admin</h1>
      <h2>{admin.length ? 'Admin Eyes Only' : 'Not an admin!'}</h2>
      <AddressForm />
      <Checkout />
      <PaymentForm />
      <Review />
      <UserFav />
    </div>
  )
}

export default AdminBoard
