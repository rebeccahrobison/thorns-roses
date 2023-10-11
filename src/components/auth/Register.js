import { useState } from "react"
import "./Login.css"
import { useNavigate } from "react-router-dom"
import { createCustomer, getCustomerByEmail } from "../../services/userService"

export const Register = () => {
  const [user, setUser] = useState({
    email: "",
    password: "",
    name: "",
    business: ""
  })

  const navigate = useNavigate()

  const registerNewUser = () => {
    const newUser = user

    createCustomer(newUser).then(createdUser => {
      if (createdUser.hasOwnProperty("id")) {
        localStorage.setItem(
          "thorns_user",
          JSON.stringify({
            id: createdUser.id
          })
        )

        navigate("/")
      }
    })
  }

  const handleRegister = (event) => {
    event.preventDefault()
    getCustomerByEmail(user.email).then(res => {
      if(res.length > 0) {
        window.alert("Account with that email already exists")
      } else {
        registerNewUser()
      }
    })
  }

  const updateUser = (event) => {
    const copy = {...user}
    copy[event.target.id] = event.target.value
    setUser(copy)
  }

  return (
    <main className="auth-container">
      <form className="auth-form" onSubmit={handleRegister}>
        <h1 className="header">Thorns & Roses</h1>
        <h2>Please Register</h2>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateUser}
              type="text"
              id="name"
              className="auth-form-input"
              placeholder="Enter your name"
              required
              autoFocus
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateUser}
              type="text"
              id="business"
              className="auth-form-input"
              placeholder="Name of Business"
              required
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateUser}
              type="email"
              id="email"
              className="auth-form-input"
              placeholder="Email address"
              required
            />
          </div>
        </fieldset>
        <fieldset className="auth-fieldset">
          <div>
            <input
              onChange={updateUser}
              type="password"
              id="password"
              className="auth-form-input"
              placeholder="Password"
              required
            />
          </div>
        </fieldset>
        
        <fieldset className="auth-fieldset">
          <div>
            <button type="submit">Register</button>
          </div>
        </fieldset>
      </form>
    </main>
  )
}