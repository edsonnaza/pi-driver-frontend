import { ALL_DRIVERS,FILTER_BY_TEAM,FILTER_BY_ORIGIN,
  SORT_BY_DOB_ASC,
  SORT_BY_DOB_DESC,
  SORT_BY_NAME_ASC,
  SORT_BY_NAME_DESC,
  RESET_FILTERS} from "./actions-types";

 
const initialState = {
  team:'',
  origin:'', 
  drivers: [],
  originalDrivers:[]
};

const rootReducer = (state = initialState, { type, payload }) => {
  switch (type) {
    case ALL_DRIVERS:
      return {
        ...state,
        drivers: payload,
        originalDrivers:payload
      };

      case FILTER_BY_TEAM:
        const filteredDrivers = payload === "" // Chequea si se seleccionó "Select Team"
        ? state.originalDrivers // Utiliza la lista completa de drivers
        : state.drivers.filter((driver) => driver.teams.some(team => team === payload));
    
      return {
        ...state,
        drivers: filteredDrivers
      };


      case FILTER_BY_ORIGIN:
        console.log(payload);
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
          drivers: filteredDriversOrigin
        };
     
        case SORT_BY_NAME_ASC:
          return {
            ...state,
            drivers: state.drivers.slice().sort((a, b) => a.forename.localeCompare(b.forename)),
          };
        case SORT_BY_NAME_DESC:
          return {
            ...state,
            drivers: state.drivers.slice().sort((a, b) => b.forename.localeCompare(a.forename)),
          };
        case SORT_BY_DOB_ASC:
          return {
            ...state,
            drivers: state.drivers.slice().sort((a, b) => new Date(a.dob) - new Date(b.dob)),
          };
        case SORT_BY_DOB_DESC:
          return {
            ...state,
            drivers: state.drivers.slice().sort((a, b) => new Date(b.dob) - new Date(a.dob)),
          };
      
    
    case RESET_FILTERS:
      return {
        ...state,
        team: "",
        origin: "All",
      };

    default:
      return state;
  }
};

export default rootReducer;
