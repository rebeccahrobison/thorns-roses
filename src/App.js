import './App.css';
import { ApplicationViews } from './views/ApplicationViews';
import { Route, Routes } from 'react-router-dom';

export const App = () =>  {
  return (
    <Routes>
      <Route path="*" element={<ApplicationViews />} />
    </Routes>
  )
}
