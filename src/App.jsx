// App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import WelcomePage from './components/WelcomePage/WelcomePage';
import NavBar from './components/NavBar/NavBar';
import HomePage from './components/HomePage/HomePage';
import AboutPage from './components/About/AboutPage';
import NewDriver from './components/NewDriver/NewDriver';
import DriverDetails from './components/DriverDetails/DriverDetails';
import Loader from './components/Loader/Loader';
import PageNotFound from './components/PageNotFound/PageNotFound';

import { useDispatch, useSelector } from 'react-redux';
import { loadAllDrivers, actionGetDriverById } from './redux/actions';
import axios from 'axios';
  
axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;
 
function App() {
 
  const isLoading = useSelector((state) => state.isLoading);
  const dispatch = useDispatch();
 

  useEffect(() => {
    
        dispatch(loadAllDrivers); 
   
  }, [dispatch]);

  const handleLogout = () => {
    console.log('logout');
  };

 
  const { pathname } = useLocation();

  const onSearch = async (searchInput) => {

    if (searchInput === '') {
      dispatch(loadAllDrivers(searchInput));
    } else if (typeof searchInput === 'string' && isNaN(searchInput)) {
      dispatch(loadAllDrivers(`?name=${searchInput}`));
    } else if (typeof searchInput === 'string' && !isNaN(searchInput) && searchInput !== '') {
      const idDriver = Number(searchInput);
      dispatch(actionGetDriverById(idDriver));
    } else {
      const isNumericOrUUID = !isNaN(searchInput) || /^[0-9a-fA-F-]{36}$/.test(searchInput);
      if (isNumericOrUUID && searchInput !== '') {
        dispatch(actionGetDriverById(searchInput));
      }
    }
 
     console.log('isLoading false',isLoading)
  };
    
  

  return (
    <div>
  
    {isLoading && <Loader/>}
      {pathname !== '/' && <NavBar onSearch={onSearch} handleLogout={handleLogout} />}
      <Routes>
        <Route path="/" element={<WelcomePage />} />
        <Route path="/home" element={<HomePage />} />
        <Route path="/about" element={<AboutPage />} />
        <Route path="/details/:id" element={<DriverDetails />} />
        <Route path="/driver" element={<NewDriver />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </div>
  );
}

export default App;
