const countAllQty = arr => {
  return arr.reduce((a, item) => a + +item.cartItem.quantity, 0)
}

export default countAllQty
