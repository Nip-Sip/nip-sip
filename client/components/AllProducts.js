import React, { useEffect } from 'react'
import { connect, useDispatch, useSelector } from 'react-redux'
import { getProducts } from '../store/products'

const AllProducts = () => {
  // componentDidMount() {
  //   try {
  //     this.props.getInitialProducts()
  //   } catch (error) {
  //     console.error(error)
  //   }
  // }
  const dispatch = useDispatch()

  useEffect(() => {
    console.log('useeffect')
    dispatch(getProducts())
  }, [])

  const { products } = useSelector((state) => {
    console.log(state)
    return state.products
  })

   // const { products } = this.props.products

    return (
      <div id="allProducts">
        {products && products.map(product => (
          <div key={product.id}>
            <div id="productName">{product.name}</div>
            <img src={product.imageUrl} />
            <div id="productDetails">
              ${product.price} | {product.category}
            </div>
            <button type="button" id="allProductsAddCartButton">
              {' '}
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    )
  }

// const mapState = products => {
//   return { products }
// }

// const mapDispatch = dispatch => {
//   return {
//     getInitialProducts: () => dispatch(getProducts())
//   }
// }

// export default connect(mapState, mapDispatch)(AllProducts)

export default AllProducts
