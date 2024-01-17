// App.jsx
import React, {useEffect} from 'react';
import { BrowserRouter as Router, Routes, Route,useLocation } from 'react-router-dom';
import WelcomePage from './components/WelcomePage/WelcomePage';
import NavBar from './components/NavBar/NavBar';
import HomePage from './components/HomePage/HomePage';
import AboutPage from './components/About/AboutPage';
import NewDriver from './components/NewDriver/NewDriver';
import DriverDetails from './components/DriverDetails/DriverDetails';
 
import { useDispatch } from 'react-redux';
import  {loadAllDrivers,actionGetDriverById}  from './redux/actions';
 
function App() {
  
  const dispatch = useDispatch();

  useEffect(() => {
    // Cargar todos los conductores y restablecer los filtros al cargar la aplicación
    dispatch(loadAllDrivers);
   // dispatch(resetFilters);
  }, [dispatch]);

 
  const handleLogout = () => {
    console.log('logout');
  }
  const {pathname} = useLocation();

  const onSearch = async (searchInput)=> {
   // console.log('searchInput onSearch:',searchInput);
  

 if(searchInput===""){ 
 //  console.log("inputSearch por vacio", searchInput);
   dispatch(loadAllDrivers(searchInput));
 }

 if(typeof searchInput==='string' && isNaN(searchInput)){
 // console.log('Buscar por nombre:', searchInput);
  dispatch(loadAllDrivers(`?name=${searchInput}`));
 }
 
 if (typeof searchInput === 'string' && !isNaN(searchInput) && searchInput!=="") {
   // La variable es una cadena que puede convertirse a número
   const idDriver = Number(searchInput);
  // console.log('La variable es una cadena que puede convertirse a número. Número:', idDriver);
   dispatch(actionGetDriverById(idDriver) ) ;
  }
  
  
  const isNumericOrUUID = !isNaN(searchInput) || /^[0-9a-fA-F-]{36}$/.test(searchInput);
      if(isNumericOrUUID && searchInput !== ""){

        console.log('Es UUID', searchInput);
       dispatch(actionGetDriverById(searchInput) ) ;
      }  
  
  
     }

       
  
  return (
  
      <div>
       { pathname!=='/' && <NavBar onSearch={onSearch}  handleLogout={handleLogout} />}
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<HomePage   />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/details/:id" element={<DriverDetails />} />
          <Route path="/driver" element={<NewDriver />} />
        </Routes>
      </div>
  
  );
}

export default App;
