import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getMyStore, getShopInfo } from '../store/shop'
import axios from 'axios'
import ProductCard from './ProductCard'

const MyStore = () => {
  const [shopInfo, setShopInfo] = useState({})
  useEffect(async () => {
    dispatch(getMyStore())
    dispatch(getShopInfo())
    // const res = await axios.get('/api/store/info')
    // setShopInfo(res.data)
  }, [])

  const dispatch = useDispatch()
  const shop = useSelector(state => state.shop)
  const INFO = useSelector(state => state.shop.info)

  if (INFO && shop.prod) {
    const { shop_name, days_opened, status } = INFO
    let icon
    if (status === 'Power Seller') {
      icon = '⭐⭐⭐ 🥳'
    } else if (status === 'Trusted') {
      icon = '⭐⭐'
    } else {
      icon = '⭐'
    }

    return (
      <div className="store-card">
        <h1 className="shopname">{shop_name}</h1>
        <h3>
          {icon} {status}
        </h3>
        <h3>Days Opened: {days_opened}</h3>
        <h1>Products</h1>
        <div className="centerthis">
          {shop.prod.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    )
  } else {
    return <h1>Loading..</h1>
  }
}

export default MyStore
