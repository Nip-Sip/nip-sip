import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminInfo } from '../store/admin'

const AdminBoard = () => {
  const dispatch = useDispatch()
  const { admin, auth } = useSelector(s => s)
  // const { id: isLoggedIn } = auth

  useEffect(() => {
    console.log('what the fuck!')
    dispatch(getAdminInfo())
  }, [])

  return (
    <div>
      <h1>Admin Board: Logged In!</h1>
      <h2>{JSON.stringify(admin)}</h2>
    </div>
  )
}

export default AdminBoard
