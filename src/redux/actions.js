import { 
  ALL_DRIVERS, 
  ALL_TEAMS,
  GET_DRIVER_BY_ID,
  CREATE_NEW_DRIVER,
  GET_DRIVER_DETAIL_BY_ID,
  FILTER_BY_TEAM,
  FILTER_BY_ORIGIN,
  RESET_FILTERS, 
  GET_ERROR_SEARCH,
  SET_CURRENT_PAGE,
  SET_TOTAL_PAGES,
  IS_LOADING
   
  } from "./actions-types";
 
 
import axios from 'axios';

//const URL = 'https://pi-driver-backend-production.up.railway.app/drivers';
//const URL_TEAMS = 'https://pi-driver-backend-production.up.railway.app/teams/';
 
axios.defaults.baseURL=import.meta.env.VITE_BASE_URL;
console.log('acitons:',axios.defaults.baseURL);
 

export const setIsLoading=(trueOrFalse)=>({
 
type: IS_LOADING,
payload: trueOrFalse,
});


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
      const response = await axios.get('/teams');
      data = response.data;

       

      dispatch({
        type: ALL_TEAMS,
        payload: data,
      });
       
    } catch (error) {
      dispatch(setIsLoading(false))
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

       // Indicar que se está cargando
       dispatch(setIsLoading(true))
       
      // Lógica para obtener los drivers
      
       
      //const response = await axios(`{'/drivers/'}${searchInput}`);  
      const response = await axios(`drivers/${searchInput}`);   
      const data = response.data;

      
      const drivers = data;
      const message = drivers.length >0 ? 'Success' : data.message;
    
     
       
      dispatch({
        type: drivers.length > 0 ? ALL_DRIVERS: GET_ERROR_SEARCH,
        payload: {
          drivers,
          message:message
           
        },
      });


      // Reiniciar los filtros de team y origin
      //dispatch(filterByTeam(""));
     // dispatch(filterByOrigin("All"));
     dispatch(actionLoadAllTeams());
     dispatch(setIsLoading(false));
      
    } catch (error) {
      // Manejo de errores si es necesario
      dispatch(setIsLoading(false))
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
      dispatch(setIsLoading(true))
      // Lógica para obtener los drivers
      

      const response = await axios(`drivers/${searchInput}`);      
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

      dispatch(setIsLoading(false))
    } catch (error) {
      dispatch(setIsLoading(false))
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
   
  return async (dispatch) => {
    try {
      // Lógica para obtener los drivers
     
      dispatch(setIsLoading(true))

      const response = await axios(`drivers/'}${searchInput}`);      
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

      dispatch(setIsLoading(false))
    } catch (error) {
      // Manejo de errores si es necesario
      console.error(error);
    }
  };

}

export const actionCreateNewDriver = (formData)=>{
  
  let statusData='';
  let buttonDisabled='false';
  let responseFormData={};
  let message;
  
  return async (dispatch) => {
    try { 

      dispatch(setIsLoading(true))
    const response = await axios.post('/drivers/', formData,  
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

      dispatch(setIsLoading(false))
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
 