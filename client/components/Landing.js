import React, { useEffect, useState, useRef } from 'react'
import Carousel from './Carousel'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import ProductCard from './ProductCard'
import '../../public/style.css'
import { motion } from 'framer-motion'

const Landing = () => {
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const [rec, setRec] = useState([])
  const [items, setItems] = useState([])

  useEffect(() => {
    const f = async () => {
      const res = await axios('/api/products/top')
      setItems(res.data)
      setLoading(true)
    }
    f()
  }, [])

  return (
    <div>
      <Carousel />
      <motion.h1 whileHover={{ scale: 1.2 }} className="trending">
        🔥🔥🔥 Trending Items: 🔥🔥🔥
      </motion.h1>
      <div className="hot">
        {items.map(p => {
          return <ProductCard key={p.product.id} product={p.product} />
        })}
      </div>
    </div>
  )
}

export default Landing
