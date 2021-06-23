import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../store/products'
import Search from './Search'
import { getCart } from '../store/cart'
import ProductCard from './ProductCard'
import { getAdminInfo } from '../store/admin'

const AllProducts = () => {
  const dispatch = useDispatch()
  const { visibleProducts } = useSelector(s => s)

  useEffect(() => {
    dispatch(getProducts())
    dispatch(getCart())
    dispatch(getAdminInfo())
  }, [])

  return (
    <>
      <Search />
      <div id="allProducts">
        {visibleProducts.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}

export default AllProducts
