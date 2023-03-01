import { Routes, Route, Link, Navigate, Outlet } from 'react-router-dom'
import './App.css';

import Navbar from './components/Navbar';

const App = () => {

  let token = localStorage.getItem("authToken");

  const LoggedIn = () => {
    return token ? <Outlet /> : <Navigate to="/" />;
  };

  const NotLoggedIn = () => {
    return !token ? <Outlet /> : <Navigate to="/" />;
  };

  return (
    <div >

      <Navbar />

        <Routes>
        

          <Route element={<LoggedIn />}>
            
          </Route>


          <Route element={<NotLoggedIn />}>
            
          </Route>


        </Routes>

    </div>
  );
}

export default App;
