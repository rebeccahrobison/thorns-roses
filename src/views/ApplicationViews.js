import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar"
import { NurseriesList } from "../components/nurseries/NurseriesList"
import { DistributorsList } from "../components/distributors/DistributorsList"
import { RetailersList } from "../components/retailers/RetailersList"
import { Welcome } from "../components/welcome/Welcome"
import { ShoppingCart } from "../components/cart/ShoppingCart"
import { useEffect, useState } from "react"

export const ApplicationViews = () => {
  const [currentUser, setCurrentUser] = useState({})

  useEffect(() => {
    const localUser = localStorage.getItem("thorns_user")
    const user = JSON.parse(localUser)
    setCurrentUser(user)
  }, [])

  return (
    <Routes>
      <Route path="/" element={<><NavBar /><Outlet /></>}>
        <Route index element={<Welcome />} />
        <Route path="/nurseries" element={<NurseriesList/>} />
        <Route path="/distributors" element={<DistributorsList/>} />
        <Route path="/retailers" element={<RetailersList />} />
        <Route path="/cart" element={<ShoppingCart currentUser={currentUser}/>} />
      </Route>
    </Routes>
  )
}