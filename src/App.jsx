// App.jsx
import React, {useEffect,useState} from 'react';
import { BrowserRouter as Router, Routes, Route,useLocation } from 'react-router-dom';
import WelcomePage from './components/WelcomePage/WelcomePage';
import NavBar from './components/NavBar/NavBar';
import HomePage from './components/HomePage/HomePage';
import AboutPage from './components/About/AboutPage';
import NewDriver from './components/NewDriver/NewDriver';
import DriverDetails from './components/DriverDetails/DriverDetails';
 
import { useDispatch, useSelector } from 'react-redux';
import  {loadAllDrivers,resetFilters}  from './redux/actions';
//import getDriverByName from './utils/getDriverByName';
//import axios from 'axios';
//const URL = 'http://localhost:3003/drivers/';
function App() {
 // const [drivers, setDrivers] = useState([]);
  const [responseData,setResponseData]=useState(true);
  const [errBarMessage, setErrBarMessage]=useState('');
  const dispatch = useDispatch();

  useEffect(() => {
    // Cargar todos los conductores y restablecer los filtros al cargar la aplicación
    dispatch(loadAllDrivers());
    dispatch(resetFilters());
  }, [dispatch]);

 
  const handleLogout = () => {
    console.log('logout');
  }
  const {pathname} = useLocation();

  const onSearch = async (drivername)=> {
    try {


    //  const exists = '';//drivers.find(char => char.id === Number(id));

    //  if(exists) {
    //    setResponseData(false);
    //    setErrBarMessage('The driver has been added already!');
    //    setPreImg([{image:'',name:''}]);
    //    return; 
    //  }

     // Get Driver By Name
    // getDriverByName(drivername, setResponseData, setErrBarMessage, setDrivers);

    
    dispatch(loadAllDrivers(drivername));
 

    //console.log('dentro de la app:',drivers)
      
     } catch(error){
       console.log(error)
     }

     }

       const drivers = useSelector((state) => state.drivers);
      console.log('drivers en la App:', drivers)
  
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
