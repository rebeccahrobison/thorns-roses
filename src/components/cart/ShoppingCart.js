import { useEffect, useState } from "react"
import { getCartByUserId } from "../../services/shoppingCartService"

export const ShoppingCart = ({currentUser}) => {
  const [shoppingCart, setShoppingCart] = useState([])

  useEffect(() => {
    getCartByUserId(currentUser.id).then(data =>
      setShoppingCart(data))
  }, [currentUser])

  return (
    <div className="cart-container">
      <h2>Shopping Cart</h2>
      <div className="cart">
        <div className="table-header">
          <span className="header-flower">Flower</span>
          <span className="header-quantity">Quantity</span>
          <span className="header-cost">Cost</span>
        </div>
        {shoppingCart.map(cartItem => {
          return (
            <div className="table-row" key={cartItem?.id}>
              <span className="row-flower">{cartItem.flower.color} {cartItem.flower.species}</span>
              <span className="row-quantity"></span>
              <span className="row-cost"></span>
            </div>
          )
        })}
      </div>

    </div>
  )
}