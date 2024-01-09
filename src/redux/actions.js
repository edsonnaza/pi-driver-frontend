import { ALL_DRIVERS,FILTER_BY_TEAM,FILTER_BY_ORIGIN,
  SORT_BY_DOB_ASC,
  SORT_BY_DOB_DESC,
  SORT_BY_NAME_ASC,
  SORT_BY_NAME_DESC,
  RESET_FILTERS} from "./actions-types";
import getAllDrivers from "../utils/getAllDrivers";
 
 
 

export const loadAllDrivers = (drivername) =>{
  return async (dispatch) => {
    try {
      // Lógica para obtener los drivers
      const data = await getAllDrivers(drivername); // Asegúrate de pasar los parámetros necesarios

      // Dispatch de la acción con los drivers obtenidos
      dispatch({
        type: ALL_DRIVERS,
        payload: data,
      });

      // Reiniciar los filtros de team y origin
      dispatch(filterByTeam(""));
      dispatch(filterByOrigin("All"));
    } catch (error) {
      // Manejo de errores si es necesario
      console.error(error);
    }
  };
}

export const filterByTeam = (team)=>{
  return {
    type: FILTER_BY_TEAM,
    payload: team
  }
}

export const filterByOrigin = (origin)=>{
  return {
    type: FILTER_BY_ORIGIN,
    payload: origin
  }
}

export const resetFilters = () => {
  return {
    type: RESET_FILTERS,
  };
};


export const sortByFirstNameAsc = () => ({
  type: SORT_BY_NAME_ASC,
});

export const sortByFirstNameDesc = () => ({
  type: SORT_BY_NAME_DESC,
});

export const sortByDOBAsc = () => ({
  type: SORT_BY_DOB_ASC,
});

export const sortByDOBDesc = () => ({
  type: SORT_BY_DOB_DESC,
});
 