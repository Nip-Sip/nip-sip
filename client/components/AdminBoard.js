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
      <Example />
    </div>
  )
}

export default AdminBoard

/* Material UI */

// https://www.npmjs.com/package/react-material-ui-carousel

import Carousel from 'react-material-ui-carousel'
import { Paper, Button } from '@material-ui/core'

function Example() {
  const items = [
    {
      name: 'Random Name #1',
      description: 'Beach',
      url: '/img/beach-drink.jpg'
    },
    {
      name: 'Random Name #2',
      description: 'Pretty drinks',
      url: '/img/glasses.jpg'
    }
  ]

  return (
    <Carousel>
      {items.map((item, i) => (
        <Item key={i} item={item} />
      ))}
    </Carousel>
  )
}

function Item(props) {
  return (
    <Paper>
      <h2>{props.item.name}</h2>
      <img style={{ height: '500px' }} src={props.item.url} alt="picture" />
      <p>{props.item.description}</p>
      <Button className="CheckButton">Check it out!</Button>
    </Paper>
  )
}
