export const postToShoppingCart = (cart) => {
  return fetch("http://localhost:8088/shoppingCarts", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(cart),
  })
}

export const getCartByUserId = (userId) => {
  return fetch(`http://localhost:8088/shoppingCarts?customerId=${userId}&_expand=flower`).then(
    res => res.json()
  )
}
