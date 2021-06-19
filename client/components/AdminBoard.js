import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminInfo } from '../store/admin'
import { Pie } from 'react-chartjs-2'

const data = {
  labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
  datasets: [
    {
      label: '# of Votes',
      data: [12, 19, 3, 5, 2, 3],
      backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)'
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)'
      ],
      borderWidth: 1
    }
  ]
}

const PieChart = () => (
  <>
    <div className="header">
      <h1 className="title">Pie Chart</h1>
    </div>
    <div style={{ position: 'relative', height: '500px', width: '500px' }}>
      <Pie data={data} />
    </div>
  </>
)

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
        <PieChart />
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
