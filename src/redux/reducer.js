import { ALL_DRIVERS,ALL_TEAMS,CREATE_NEW_DRIVER,GET_DRIVER_BY_ID, GET_DRIVER_DETAIL_BY_ID,FILTER_BY_TEAM,FILTER_BY_ORIGIN,
  SORT_BY_DOB_ASC,
  SORT_BY_DOB_DESC,
  SORT_BY_NAME_ASC,
  SORT_BY_NAME_DESC,
  RESET_FILTERS,
  GET_ERROR_SEARCH,
  SET_CURRENT_PAGE,
  SET_TOTAL_PAGES,
  IS_LOADING,
  LOAD_DRIVERS_SUCCESS,
  LOAD_DRIVERS_FAILURE,} from "./actions-types";

 
const initialState = {
  teams:[],
  drivers: [],
  originalDrivers:[],
  driverDetail:[],
  message: 'Nothing',
  status:'save',
  buttonDisabled:true,
  formData:{},
  originFilter:'ALL', 
  sortBy:"Reset All",
  sortOrder:"asc",
  teamFilter:"Select Team",
  currentPage:1,
  driversPerPage:9,
  storedPage:"",
  totalPages:1,
  isLoading:false,

};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
   
  case IS_LOADING:
     
    return {
      ...state,
      isLoading:payload
    }
  case SET_CURRENT_PAGE:
  return {
    ...state,
    currentPage: payload,
  };

  case SET_TOTAL_PAGES:  
      return {
        ...state,
        totalPages: payload,
      };

    case GET_ERROR_SEARCH:
       
      return {
        ...state,
        message:payload.message,
      }

    case ALL_TEAMS:
      return {
        ...state,
        teams:payload
      }

    case ALL_DRIVERS:
    
      return {
        ...state,
        drivers: payload.drivers,
        originalDrivers: payload.drivers,
        message: payload.message, // Almacena el mensaje en el estado
        totalPages: Math.ceil(state.drivers.length / payload.driversPerPage),
         
      };

      case GET_DRIVER_BY_ID:
    
        return {
          ...state,
          driverDetail:[payload.drivers],
          drivers: [payload.drivers],
          message: payload.message,
        };
      
        case GET_DRIVER_DETAIL_BY_ID:
    
          return {
            ...state,
            driverDetail:[payload.drivers],
           
           
          };

          case CREATE_NEW_DRIVER:
             
            return {
              ...state,
              formData:payload.formData,
              status:payload.status,
              buttonDisabled:payload.buttonDisabled,
             
            };

      case FILTER_BY_TEAM:
        const filteredDrivers = payload === "" // Chequea si se seleccionó "Select Team"
        ? state.originalDrivers // Utiliza la lista completa de drivers
        : state.drivers.filter((driver) => driver.teams.some(team => team === payload));
    
      return {
        ...state,
        drivers: filteredDrivers,
        teamFilter:payload,
        message:filteredDrivers.length>0 ?'Success' :'No drivers found',
        
      };


      case FILTER_BY_ORIGIN:
    
        const filteredDriversOrigin = payload === 'All'
          ? state.originalDrivers // Utiliza la lista completa de drivers
          : state.originalDrivers.filter((driver) => {
              // Si el origen seleccionado es 'All', devuelve true para todos los drivers
              // Si el origen seleccionado es 'API', filtra por api: true
              // Si el origen seleccionado es 'DDBB', filtra por api: false
              return payload === 'All' || (payload === 'API' ? driver.api : !driver.api);
            });
      
        return {
          ...state,
          drivers: filteredDriversOrigin,
          originFilter:payload,
          message:filteredDriversOrigin.length>0 ?'Success' :'No drivers found',
          
        };
     
        case SORT_BY_NAME_ASC:
          return {
            ...state,
            drivers: state.drivers.slice().sort((a, b) => a.forename.localeCompare(b.forename)),
            sortBy:payload
          };
        case SORT_BY_NAME_DESC:
          return {
            ...state,
            drivers: state.drivers.slice().sort((a, b) => b.forename.localeCompare(a.forename)),
            sortBy:payload
          };
        case SORT_BY_DOB_ASC:
          return {
            ...state,
            drivers: state.drivers.slice().sort((a, b) => new Date(a.dob) - new Date(b.dob)),
            sortBy:payload
          };
        case SORT_BY_DOB_DESC:
          return {
            ...state,
            drivers: state.drivers.slice().sort((a, b) => new Date(b.dob) - new Date(a.dob)),
            sortBy:payload
          };
      
    
    case RESET_FILTERS:
      console.log('RESET FILTERS');
      return {
        ...state,
        sortBy: "Reset All",
        originFilter: "All",
        teamFilter:"Select Team",
        drivers:state.originalDrivers,
         
        
      } ;

    

    default:
      return state;
  }
};

export default rootReducer;
