import React, { useState, useEffect } from "react";
import Cards from "../Cards/Cards";
import classes from './HomePage.module.scss';
import SearchOptions from "../SearchOptions/SearchOptions";
import axios from "axios";
import getTeams from "../../utils/getTeams";
import { useMemo } from 'react';

const HomePage = (props) => {
  const storedPage = localStorage.getItem('currentPage');
  const [currentPage, setCurrentPage] = useState(storedPage ? parseInt(storedPage, 10) : 1);
  const [driversPerPage] = useState(9); // Cambiado a 9 conductores por página
  const maxPageButtons = 5; // Agregado maxPageButtons
  const [filterOptions, setFilterOptions] = useState({
    team: "",
    origin: "",
  });
  const [sortOptions, setSortOptions] = useState({
    sortBy: "",
    sortOrder: "asc",
  });

  const handleSearch = () => {
    // Lógica de búsqueda aquí con driverName, filterOptions y sortOptions
  };

  const handleFilterChange = (event) => {
    const { name, value } = event.target;
    setFilterOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
  };

  const handleSortChange = (event) => {
    const { name, value } = event.target;
    setSortOptions((prevOptions) => ({ ...prevOptions, [name]: value }));
  };





  const indexOfLastDriver = Math.min(currentPage * driversPerPage, props.drivers.length);
  const indexOfFirstDriver = Math.max(0, indexOfLastDriver - driversPerPage);

  const filteredDrivers = useMemo(() => {
    return props.drivers.filter((driver) => {
      // Filtra por equipo si el equipo está seleccionado
      return filterOptions.team ? driver.teams.includes(filterOptions.team) : true;
      // Puedes agregar más condiciones de filtro aquí según tus necesidades
    });
  }, [props.drivers, filterOptions.team]);

  const currentDrivers = filteredDrivers.slice(indexOfFirstDriver, indexOfLastDriver);

   

  const totalPages = Math.ceil(props.drivers.length / driversPerPage);

  const rangeStart = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const rangeEnd = Math.min(totalPages, rangeStart + maxPageButtons - 1);

  useEffect(() => {
    localStorage.setItem('currentPage', currentPage.toString());
  }, [currentPage, props.drivers]);

  return (
    <div className={classes.container}>

        {props.drivers.length > 0 && (
        <SearchOptions
          filterOptions={filterOptions}
          sortOptions={sortOptions}
          onFilterChange={handleFilterChange}
          onSortChange={handleSortChange}

        />
      )}

      <Cards drivers={currentDrivers} />

      <div className={classes.controls}>
        <button
          onClick={() => setCurrentPage(1)}
          disabled={currentPage === 1}
          className={classes.pageButton}
        >
          First
        </button>
        <button
          className={classes.pageButton}
          onClick={() => setCurrentPage(currentPage - 1)}
          disabled={currentPage === 1}
        >
          {'<<'}
        </button>

        {Array.from({ length: rangeEnd - rangeStart + 1 }, (_, index) => rangeStart + index).map((page) => (
          <button
            key={page}
            onClick={() => setCurrentPage(page)}
            className={`${classes.pageButton} ${page === currentPage ? classes.activePage : ''}`}
            disabled={page === currentPage}
          >
            {page}
          </button>
        ))}

        {rangeEnd < totalPages && (
          <>
            <span>...</span>
            <button onClick={() => setCurrentPage(totalPages)} className={classes.pageButton}>
              {totalPages}
            </button>
          </>
        )}

        <button
          className={classes.pageButton}
          onClick={() => setCurrentPage(currentPage + 1)}
          disabled={indexOfLastDriver >= props.drivers.length}
        >
          {'>>'}
        </button>

        <button
          onClick={() => setCurrentPage(totalPages)}
          className={classes.pageButton}
        >
          Last
        </button>
      </div>
    </div>
  );
};

export default HomePage;
