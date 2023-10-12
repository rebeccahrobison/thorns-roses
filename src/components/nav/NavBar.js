import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"
import { useEffect, useState } from "react"
import { getCartByUserId } from "../../services/shoppingCartService"

export const NavBar = ({ currentUser }) => {
  const [itemsInCart, setItemsInCart] = useState(0)
  const navigate = useNavigate()

  useEffect(() => {
    const updateCartCount = () => {
      const localUserData = JSON.parse(localStorage.getItem("thorns_user"))
      const userCartSize = localUserData.cart
      setItemsInCart(parseInt(userCartSize))
    }
    // Add an event listener for custom event
    window.addEventListener("cartUpdated", updateCartCount)
    // Call the fucntion to set the cart count
    updateCartCount()
    // Clean up event listener when component unmounts
    return () => window.removeEventListener("cartUpdated", updateCartCount)
  }, [])

  // useEffect(() => {
  //   getCartByUserId(currentUser.id).then(data =>
  //     setItemsInCart(data.length))
  // }, [currentUser])
  
  return (
    <div className="navbar-container">
      <ul className="navbar">
        <li className="navbar-item">
          <Link className="navbar-link" to="/nurseries">Nurseries</Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to="/distributors">Distributors</Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to="/retailers">Retailers</Link>
        </li>
        <li className="navbar-item">
          <Link className="navbar-link" to="/cart">My Cart ({itemsInCart})</Link>
        </li>
        {localStorage.getItem("thorns_user") ? (
          <li className="navbar-item navbar-logout">
            <Link 
                className="navbar-link" 
                to=""
                onClick={() => {
                  localStorage.removeItem("thorns_user")
                  navigate("/", {replace: true})
                }}
              >Log Out
            </Link>
          </li>
        ) : ("")}
        
      </ul>
      
    </div>
  )
}