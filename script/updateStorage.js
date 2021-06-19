const updateStorage = (arr, newItem) => {
  if (arr.some(product => product.id === newItem.id)) {
    return arr.map(product => {
      if (product.id !== newItem.id) return product
      else {
        if (!newItem.cartItem.inCart) {
          newItem.cartItem.quantity = +product.cartItem.quantity + +newItem.cartItem.quantity
        }
        return newItem
      }
    })
  } else return [...arr, newItem]
}

export default updateStorage
