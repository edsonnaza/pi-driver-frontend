import { useState, useEffect } from "react";
import Cards from "../Cards/Cards";
import classes from './HomePage.module.scss';

const HomePage = (props) => {
  const storedPage = localStorage.getItem('currentPage'); // Recuperar el estado almacenado

  const [currentPage, setCurrentPage] = useState(storedPage ? parseInt(storedPage, 10) : 1);
  const [driversPerPage] = useState(5);
  const maxPageButtons = 5; // Número máximo de botones de páginas a mostrar

  // Calcular índices
  const indexOfLastDriver = currentPage * driversPerPage;
  let indexOfFirstDriver = indexOfLastDriver - driversPerPage;

  // Asegurarse de que el índice de inicio no sea mayor que el número total de conductores menos 1
  indexOfFirstDriver = Math.min(indexOfFirstDriver, props.drivers.length - 1);

  // Lógica para calcular los conductores a mostrar en la página actual
  const currentDrivers = props.drivers.slice(indexOfFirstDriver, indexOfLastDriver);

  // Calcular el número total de páginas
  const totalPages = Math.ceil(props.drivers.length / driversPerPage);

  // Calcular el rango de páginas a mostrar
  const rangeStart = Math.max(1, currentPage - Math.floor(maxPageButtons / 2));
  const rangeEnd = Math.min(totalPages, rangeStart + maxPageButtons - 1);
  useEffect(() => {
    // Almacena el estado actual cada vez que cambia
    localStorage.setItem('currentPage', currentPage.toString());
  }, [currentPage]);

  // Resto del código permanece igual...
 
  return (
    <div className={classes.container}>
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

        {/* Mostrar las páginas disponibles */}
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

        {/* Agregar puntos suspensivos (...) si hay más páginas */}
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
