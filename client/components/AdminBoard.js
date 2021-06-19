import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminInfo } from '../store/admin'

const AdminBoard = () => {
  const dispatch = useDispatch()
  const { admin } = useSelector(s => s)

  useEffect(() => {
    dispatch(getAdminInfo())
  }, [])

  if (!!admin.length) {
    return (
      <div>
        <h1>Admin Dashboard</h1>
        <h2>All Users</h2>
        {admin.map(user => (
          <div key={user.id}>{user.username}</div>
        ))}
      </div>
    )
  } else {
    return <h1>Not an admin..</h1>
  }
}

export default AdminBoard

/* Material UI */
// https://www.npmjs.com/package/react-material-ui-carousel

// import { AccessAlarm, ThreeDRotation } from '@material-ui/icons'

// import Carousel from 'react-material-ui-carousel'
// import { Paper, Button } from '@material-ui/core'

// function Example() {
//   const items = [
//     {
//       name: 'Random Name #1',
//       description: 'Beach',
//       url: '/img/beach-drink.jpg'
//     },
//     {
//       name: 'Random Name #2',
//       description: 'Pretty drinks',
//       url: '/img/glasses.jpg'
//     }
//   ]

//   return (
// <>
// <AccessAlarm color="primary" fontSize="large" />
// <ThreeDRotation color="secondary" />
//     <Carousel>
//       {items.map((item, i) => (
//         <Item key={i} item={item} />
//       ))}
//     </Carousel>
// </>
//   )
// }

// function Item(props) {
//   return (
//     <Paper>
//       <h2>{props.item.name}</h2>
//       <img style={{ height: '500px' }} src={props.item.url} alt="picture" />
//       <p>{props.item.description}</p>
//       <Button className="CheckButton">Check it out!</Button>
//     </Paper>
//   )
// }
