import React, { useEffect } from "react";
import Cards from "../Cards/Cards";
import classes from './HomePage.module.scss';
import SearchOptions from "../SearchOptions/SearchOptions";
import Controls from "../Controls/Controls";
import { useDispatch, useSelector } from 'react-redux';
import { setTotalPages, setCurrentPage } from "../../redux/actions";

const HomePage = () => {
  const dispatch = useDispatch();
  const teamFilter = useSelector((state) => state.team);
  const originFilter = useSelector((state) => state.origin);
  const errResponseData = useSelector((state) => state.message);
  const sortOptions = useSelector((state) => state.sortOptions);
  const currentPage = useSelector((state) => state.currentPage);
  const driversPerPage = useSelector((state) => state.driversPerPage);
  const drivers = useSelector((state) => state.drivers);
  const totalPages = useSelector((state)=>(state.totalPages))

   
   

  useEffect(() => {
    // Lógica para manejar cambios de página, filtros y opciones de clasificación

    // Después de cargar los conductores, recalcular el número total de páginas
    dispatch(setTotalPages(driversPerPage));
  }, [currentPage, teamFilter, originFilter, sortOptions, dispatch,totalPages,errResponseData]); // Asegúrate de incluir todas las dependencias necesarias


 

  const indexOfLastDriver = Math.min(currentPage * driversPerPage, drivers.length);
  const indexOfFirstDriver = Math.max(0, indexOfLastDriver - driversPerPage);
  const displayedDrivers = drivers.slice(indexOfFirstDriver, indexOfLastDriver);

  
  
  return (
    <div className={drivers.length === 0 ? classes.containerEmpty : classes.containerNoEmpty}>
      {drivers.length > 0 && (
        <SearchOptions/>
      )}
 
      
      {(errResponseData && errResponseData === 'Driver not found. Please double-check the ID' || errResponseData==='No drivers found')  && (
        <h1 className={classes.dataMessage}>{errResponseData}</h1>
      )}
      <Cards drivers={displayedDrivers} />
      {drivers.length > 0 && <Controls totalPages={totalPages}/>}
    </div>
  );
};

export default HomePage;
