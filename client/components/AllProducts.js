import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../store/products'
import Search from './Search'
import { getCart } from '../store/cart'
import ProductCard from './ProductCard'

const AllProducts = () => {
  const dispatch = useDispatch()
  const { products } = useSelector(s => s)

  useEffect(() => {
    dispatch(getProducts())
    dispatch(getCart())
  }, [])

  return (
    <>
      {/* <Carousel /> */}
      {/* Docs:
			https://www.npmjs.com/package/react-responsive-carousel */}
      <Search />
      <div id="allProducts">
        {products.map(product => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  )
}

export default AllProducts
