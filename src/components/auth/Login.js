import { useState } from "react"
import "./Login.css"
import { Link, useNavigate } from "react-router-dom"
import { getCustomerByEmail } from "../../services/userService"

export const Login = () => {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleLogin = (e) => {
    e.preventDefault()

    const fetchCustomer = async () => {
      const foundCustomers = await getCustomerByEmail(email)
      if (foundCustomers.length === 1 && password === foundCustomers[0].password) {
        const user = foundCustomers[0]
        localStorage.setItem(
          "thorns_user",
          JSON.stringify({
            id: user.id,
            cart: 0
          })
          )
        navigate("/")
      } else {
        window.alert("Invalid login")
      }
      }
    
    fetchCustomer()
  }

  return (
    <main className="auth-container">
      <section>
        <form className="auth-form" onSubmit={handleLogin}>
          <h1 className="header">Thorns & Roses</h1>
          <h2>Please sign in</h2>
          <fieldset className="auth-fieldset">
            <div>
              <input
                type="email"
                value={email}
                className="auth-form-input"
                onChange={event => setEmail(event.target.value)}
                placeholder="Email address"
                required
              />
              <input
                type="password"
                value={password}
                className="auth-form-input"
                onChange={event => setPassword(event.target.value)}
                placeholder="Password"
                required
              />
            </div>
          </fieldset>
          <fieldset>
            <div className="form-group">
              <button className="login-btn" type="submit">
                Sign In
              </button>
            </div>
          </fieldset>
        </form>
      </section>
      <section className="register-link">
        <Link to="/register">Not a member yet?</Link>
      </section>
    </main>
  )
}

