import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getAdminInfo } from '../store/admin'
import { Pie, Line } from 'react-chartjs-2'

const data = {
  labels: ['1', '2', '3', '4', '5', '6'],
  datasets: [
    {
      label: 'Total Revenue',
      data: [12, 19, 3, 5, 2, 3],
      fill: false,
      backgroundColor: 'rgb(255, 99, 132)',
      borderColor: 'rgba(255, 99, 132, 0.2)'
    }
  ]
}

const options = {
  scales: {
    yAxes: [
      {
        ticks: {
          beginAtZero: true
        }
      }
    ]
  }
}

export const LineChart = () => (
  <>
    <div className="header">
      <h1 style={{ textAlign: 'center' }}>Sales Over Time</h1>
    </div>
    <Line data={data} options={options} />
  </>
)

const data2 = {
  labels: ['Whisky', 'Vodka', 'Tequila', 'Liqeur', 'Rum'],
  datasets: [
    {
      label: '# of Votes',
      data: [32, 31, 9, 22, 2, 3],
      backgroundColor: [
        'orange',
        'blueviolet',
        'deeppink',
        'deepskyblue',
        'khaki'
      ],
      borderColor: ['orange', 'blueviolet', 'deeppink', 'deepskyblue', 'khaki'],
      borderWidth: 1
    }
  ]
}

export const PieChart = () => (
  <>
    <div className="header">
      <h1 style={{ textAlign: 'center' }}>Top Products</h1>
    </div>
    <div
      style={{
        position: 'relative',
        height: '500px',
        width: '500px',
        margin: '0 auto'
      }}
    >
      <Pie data={data2} />
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
