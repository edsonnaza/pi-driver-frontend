import { 
  ALL_DRIVERS, 
  ALL_TEAMS,
  GET_DRIVER_BY_ID,
  CREATE_NEW_DRIVER,
  GET_DRIVER_DETAIL_BY_ID,
  FILTER_BY_TEAM,
  FILTER_BY_ORIGIN,
  SORT_BY_DOB_ASC,
  SORT_BY_DOB_DESC,
  SORT_BY_NAME_ASC,
  SORT_BY_NAME_DESC,
  RESET_FILTERS, 
  GET_ERROR_SEARCH,
  SET_CURRENT_PAGE,
  SET_TOTAL_PAGES
   
  } from "./actions-types";
 
 
import axios from 'axios';

const URL = 'http://localhost:3003/drivers/';
const URL_TEAMS = 'http://localhost:3003/teams/';
 
 
 
export const setCurrentPage = (currentPage) => ({
  type: SET_CURRENT_PAGE,
  payload: currentPage,
});

export const setTotalPages = (driversPerPage) => (dispatch, getState) => {
  const state = getState();
  const totalPages = Math.ceil(state.drivers.length / driversPerPage);

  dispatch({
    type: SET_TOTAL_PAGES,
    payload: totalPages,
  });
};

export const actionLoadAllTeams = () => {
  return async (dispatch) => {
    try {
      let data = null;
      const response = await axios.get(URL_TEAMS);
      data = response.data;

       

      dispatch({
        type: ALL_TEAMS,
        payload: data,
      });
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un estado diferente de 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        // La solicitud se hizo pero no se recibió respuesta
        console.error('Error request:', error.request);
      } else {
        // Otro tipo de error
        console.error('Error message:', error.message);
      }

      // Lanza la excepción para que los componentes que llaman a esta acción puedan manejar el error
      throw error;
    }
  };
};
export const loadAllDrivers = (searchInput) =>{
  return async (dispatch) => {
    try {
      // Lógica para obtener los drivers
       
      const response = await axios(`${URL}${searchInput}`);      
      const data = response.data;

      
      const drivers = data;
      const message = drivers.length >0 ? 'Success' : data.message;
    
     
       
      dispatch({
        type: drivers.length > 0 ? ALL_DRIVERS: GET_ERROR_SEARCH,
        payload: {
          drivers,
          message:message,
        },
      });


      // Reiniciar los filtros de team y origin
      //dispatch(filterByTeam(""));
     // dispatch(filterByOrigin("All"));
     dispatch(actionLoadAllTeams());
    } catch (error) {
      // Manejo de errores si es necesario
      if (error.response) {
        // El servidor respondió con un estado diferente de 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        // La solicitud se hizo pero no se recibió respuesta
        console.error('Error request:', error.request);
      } else {
        // Otro tipo de error
        console.error('Error message:', error.message);
      }

      dispatch({
        type: GET_ERROR_SEARCH,
        payload: {
          message: error.response.data,
        },
      });
    }
  };
}

export const actionGetDriverById = (searchInput)=>{
  console.log('searchInput valor:',searchInput);
  return async (dispatch) => {
    try {
      // Lógica para obtener los drivers
      

      const response = await axios(`${URL}${searchInput}`);      
      const data = response.data;
     
      const drivers = data;
      const message = data.forename? 'Success' : response.data;
      //const message = data.message !== undefined ? data.message : 'No message available';
    
       
      dispatch({
        type: GET_DRIVER_BY_ID,
        payload: {
          drivers,
          message: message,
        },
      });

 
    } catch (error) {
      if (error.response) {
        // El servidor respondió con un estado diferente de 2xx
        console.error('Error response data:', error.response.data);
        console.error('Error response status:', error.response.status);
        console.error('Error response headers:', error.response.headers);
      } else if (error.request) {
        // La solicitud se hizo pero no se recibió respuesta
        console.error('Error request:', error.request);
      } else {
        // Otro tipo de error
        console.error('Error message:', error.message);
      }

      dispatch({
        type: GET_ERROR_SEARCH,
        payload: {
          message: error.response.data,
        },
      });
    }
  };

}

export const actionGetDriverDetailById = (searchInput)=>{
  console.log('searchInput Driver Detail value:',searchInput);
  return async (dispatch) => {
    try {
      // Lógica para obtener los drivers
      //const data = await getAllDrivers(drivername); // Asegúrate de pasar los parámetros necesarios
      //const data = await getDriverById(idDriver); 

      const response = await axios(`${URL}${searchInput}`);      
      const data = response.data;
      
      //const drivers = Array.isArray(data) ? data : [data];
      const drivers = data;
       
      const message = drivers.length >0 ? 'Success' : 'No driver found.';
       
      dispatch({
        type: GET_DRIVER_DETAIL_BY_ID,
        payload: {
          drivers,
          message: message,
        },
      });

 
    } catch (error) {
      // Manejo de errores si es necesario
      console.error(error);
    }
  };

}

export const actionCreateNewDriver = (formData)=>{
  console.log('Create New Driver:',formData);
  let statusData='';
  let buttonDisabled='false';
  let responseFormData={};
  let message;
  
  return async (dispatch) => {
    try { 
    const response = await axios.post(URL, formData,  
      {
        headers: {
          'Content-Type': 'application/json', // Puedes agregar otros encabezados si es necesario
        },
       
      });

      
      if (response.status === 201) {
        // Éxito
         statusData='Saved';
         buttonDisabled=true;
      

        
       // setFormData({ ...initialFormData, buttonDisabled:true, status:'Saved' })
       responseFormData=response.data;
        message = 'Saved Successfully' 
        // Puedes agregar más lógica aquí después de la creación exitosa del driver
      } else {
        // Si el servidor responde con un código de error
         statusData=response.status;
         buttonDisabled=true;
         mensaje=response.data;
        console.error('Error the response of the API:', response.status, response.data);

      }
       
      dispatch({
        type: CREATE_NEW_DRIVER,
        payload: {
          formData:responseFormData,
          status:statusData,
          buttonDisabled:true,
          message: message,
        },
      });

 
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


export const actionSortBy = (sortbyTypeName)=>({
    type:sortbyTypeName,
    payload:sortbyTypeName
});
 