import React from 'react'
import { connect } from 'react-redux'
import { getProducts } from '../store/products'

class AllProducts extends React.Component {
  componentDidMount() {
    try {
      this.props.getInitialProducts()
    } catch (error) {
      console.error(error)
    }
  }

  render() {
    const { products } = this.props.products

    return (
      <div id="allProducts">
        {products.map(product => (
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
}

const mapState = products => {
  return { products }
}

const mapDispatch = dispatch => {
  return {
    getInitialProducts: () => dispatch(getProducts())
  }
}

export default connect(mapState, mapDispatch)(AllProducts)
