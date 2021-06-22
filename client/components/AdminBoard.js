import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminInfo } from '../store/admin'
import Share from './Share'

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
      <h1>Share Component 👇</h1>
      <Share />
    </div>
  )
}

export default AdminBoard
