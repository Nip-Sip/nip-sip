import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminInfo } from '../store/admin'
// Material UI Icons
import { AccessAlarm, ThreeDRotation } from '@material-ui/icons'

const AdminBoard = () => {
  const dispatch = useDispatch()
  const { admin, auth } = useSelector(s => s)

  useEffect(() => {
    dispatch(getAdminInfo())
  }, [])

  return (
    <div>
      <h1>Logged in but not an Admin</h1>
      <AccessAlarm color="primary" fontSize="large" />
      <p>Inline style?</p>
      <ThreeDRotation color="secondary" />
      <h2>{admin.length ? 'Admin Eyes Only' : 'Not an admin!'}</h2>
    </div>
  )
}

export default AdminBoard
