import { useEffect, useState } from "react"
import { getCartByUserId } from "../../services/shoppingCartService"
import "./ShoppingCart.css"
import { getDistributorRetailers } from "../../services/retailerService"
import { getNurseryFlowersByFlowerId } from "../../services/nurseryService"

export const ShoppingCart = ({currentUser}) => {
  const [shoppingCart, setShoppingCart] = useState([])
  const [filteredCart, setFilteredCart] = useState([])
  const [distributorRetailers, setDistributorRetailers] = useState([])
  let totalPrice = 0

  useEffect(() => {
    getCartByUserId(currentUser.id).then(data =>
      setShoppingCart(data))
  }, [currentUser])

  useEffect(() => {
    // filters cart by flowerId so only one of each flower are in array
    const uniqueCart = shoppingCart.filter((item, index) => {
      const currentIndex = shoppingCart.findIndex(
        (i) => i.flowerId === item.flowerId
      )
      return currentIndex === index
    })
    setFilteredCart(uniqueCart)
  }, [shoppingCart])

  useEffect(() => {
    getDistributorRetailers().then(data => {
      setDistributorRetailers(data)
    })
  }, [])

  const cartQuantityFilter = (cartItem) => {
    const quantity = shoppingCart.filter(
      (item) => item.flowerId === cartItem.flowerId
    ).length
    return quantity
  }

  const getTotalFlowerPrice = (flowerId) => {
    const uniqueFlower = shoppingCart.filter(item => item.flowerId === flowerId)
    let totalFlowerPrice = 0
    uniqueFlower.map(flower => totalFlowerPrice += flower.price)
    totalPrice += (totalFlowerPrice.toFixed(2))*1
    return totalFlowerPrice.toFixed(2)
  }

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <div className="cart">
        <div className="table-header row">
          <span className="header row-cell">Flower</span>
          <span className="header row-cell">Quantity</span>
          <span className="header row-cell">Cost</span>
        </div>
        {filteredCart.map(cartItem => {
          return (
            <div className="table-row row" key={cartItem?.id}>
              <span className="row-cell">{cartItem.flower.color} {cartItem.flower.species}</span>
              <span className="row-cell">{cartQuantityFilter(cartItem)}</span>
              <span className="row-cell">${getTotalFlowerPrice(cartItem.flowerId)}</span>
            </div>
          )
        })}
      </div>
      <div className="total-price"><span>Total Price: </span><span>${totalPrice.toFixed(2)}</span></div>
    </div>
  )
}