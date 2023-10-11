import { Link, useNavigate } from "react-router-dom"
import "./NavBar.css"

export const NavBar = () => {
  const navigate = useNavigate()
  return (
    <div>
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
          <Link className="navbar-link" to="/cart">My Cart</Link>
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