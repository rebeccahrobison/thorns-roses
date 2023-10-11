import './App.css';
import { ApplicationViews } from './views/ApplicationViews';
import { Route, Routes } from 'react-router-dom';
import { Authorized } from './views/Authorized';
import { Login } from './components/auth/Login';
import { Register } from './components/auth/Register';

export const App = () =>  {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      
      <Route path="*" element={
        <Authorized>
          <ApplicationViews />
        </Authorized>
      } />
    </Routes>
  )
}
