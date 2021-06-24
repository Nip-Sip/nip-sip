import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const MyStore = () => {
  const dispatch = useDispatch()
  const user = useSelector(state => state.user)
  return (
    <div>
      <h1>My Store!</h1>
    </div>
  )
}

export default MyStore
