import React, { useEffect, useState } from 'react'
import Carousel from './Carousel'
import axios from 'axios'

const Landing = () => {
  useEffect(() => {
    const f = async () => {
      const res = await axios('/api/products/top')
      setItems(res.data)
    }
    f()
  }, [])

  const [items, setItems] = useState([])

  return (
    <div>
      <Carousel />
      <h1>Recommended Items:</h1>
      {items.map(p => {
        return (
          <div key={p.id}>
            🍹 {p.product.name}: {p.quantity}
          </div>
        )
      })}
    </div>
  )
}

export default Landing
