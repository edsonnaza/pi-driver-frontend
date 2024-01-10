import React, { useState, useEffect, useRef } from "react";
 
import Cards from "../Cards/Cards";
import classes from './HomePage.module.scss';
import SearchOptions from "../SearchOptions/SearchOptions";
import { useMemo } from 'react';
import Controls from "../Controls/Controls";
import { useDispatch, useSelector } from 'react-redux';
import { filterByTeam,filterByOrigin,resetFilters,sortByDOBAsc,sortByDOBDesc,sortByFirstNameAsc,sortByFirstNameDesc,loadAllDrivers } from "../../redux/actions";


const HomePage = (props) => {
  const dispatch = useDispatch();
  const drivers = useSelector((state) => state.drivers);
  const teamFilter = useSelector((state) => state.team);
  const originFilter = useSelector((state) => state.origin);
 
  const storedPage = localStorage.getItem('currentPage');
  const [currentPage, setCurrentPage] = useState(storedPage ? parseInt(storedPage, 10) : 1);
  const [driversPerPage] = useState(9);
  const maxPageButtons = 5;
  const [filterOptions, setFilterOptions] = useState({
    team: "",
    origin: "",
  });
  const [sortOptions, setSortOptions] = useState({
    sortBy: "",
    sortOrder: "asc",
  });

  const sortSelectRef = useRef(null);

  const handleSearch = () => {
    // Lógica de búsqueda aquí con driverName, filterOptions y sortOptions
  };

 
  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterOptions((prevOptions) => ({ ...prevOptions, [name]: value }));

    if (name === 'team') {
      dispatch(filterByTeam(value));
    } else if (name === 'origin') {
      dispatch(filterByOrigin(value));
    }
  };

  const handleSortChange = (event) => {
    const { name, value } = event.target;
    setSortOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
   // Verifica si la opción seleccionada es "all_reset"
  if (value === 'resetAll') {
    // Realiza la acción especial aquí, por ejemplo, volviendo a cargar los datos originales
    dispatch(loadAllDrivers(''));
    setFilterOptions({ team: '', origin: '' });
    // Limpia la selección del sort
    sortSelectRef.current.selectedIndex = 0;
  } else { 

    // Disparar acciones de ordenación según el valor del campo de selección
    switch (value) {
      case 'forename_asc':
        dispatch(sortByFirstNameAsc());
        break;
      case 'forename_desc':
        dispatch(sortByFirstNameDesc());
        break;
      case 'dob_asc':
        dispatch(sortByDOBAsc());
        break;
      case 'dob_desc':
        dispatch(sortByDOBDesc());
        break;
      default:
        break;
    }
  }
  };

  const indexOfLastDriver = Math.min(currentPage * driversPerPage, drivers.length);
  const indexOfFirstDriver = Math.max(0, indexOfLastDriver - driversPerPage);

   

  const filteredDrivers = useMemo(() => {
    return drivers.filter((driver) => {
      const teamFilterApplied = teamFilter ? driver.teams.includes(teamFilter) : true;
      const originFilterApplied =
        originFilter === 'All' || (originFilter === 'API' ? driver.api : !driver.api);

      return teamFilterApplied && originFilterApplied;
    });
  }, [drivers, teamFilter, originFilter]);

  const currentDrivers = useMemo(() => {
    return filteredDrivers.slice(indexOfFirstDriver, indexOfLastDriver);
  }, [filteredDrivers, indexOfFirstDriver, indexOfLastDriver]);

  const totalPages = Math.ceil(drivers.length / driversPerPage);

  const rangeStart = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const rangeEnd = Math.min(totalPages, rangeStart + maxPageButtons - 1);

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage.toString());
  }, [currentPage, drivers]);

  return (
    <div className={drivers.length === 0 ? classes.containerEmpty : classes.containerNoEmpty}>
      {drivers.length > 0 && (
        <SearchOptions
          filterOptions={filterOptions}
          sortOptions={sortOptions}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}
          sortSelectRef={sortSelectRef}
        />
      )}
      <Cards drivers={currentDrivers} />
      {drivers.length && (
        <Controls
          key={drivers.id}
          drivers={drivers}
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          rangeEnd={rangeEnd}
          rangeStart={rangeStart}
          totalPages={totalPages}
          indexOfLastDriver={indexOfLastDriver}
        />
      )}
    </div>
  );
};

export default HomePage;
