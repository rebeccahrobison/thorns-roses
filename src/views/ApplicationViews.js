import { Outlet, Route, Routes } from "react-router-dom"
import { NavBar } from "../components/nav/NavBar"
import { NurseriesList } from "../components/nurseries/NurseriesList"

export const ApplicationViews = () => {
  return (
    <Routes>
      <Route path="/" element={<><NavBar /><Outlet /></>}>
        <Route path="/nurseries" element={<NurseriesList/>} />
        <Route path="/distributors" element={<></>} />
        <Route path="/retailers" element={<></>} />
      </Route>
    </Routes>
  )
}