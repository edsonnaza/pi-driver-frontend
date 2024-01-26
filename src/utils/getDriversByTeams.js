 

import axios from 'axios';
 

//const URL = 'http://localhost:3003/drivers/';

const getDriversByTeams = async (team) => {
  try {
    const { data } = await axios.get('/drivers/');
    
    if (data && data.length > 0 && data[0].forename) {
      console.log('funcion by Name:', data);
      
      return data;
    } else {
      console.log('Something went wrong', data);
      return [];
    }
  } catch (error) {
    console.error(error);
    return [];
  }
};
export default getAllDrivers;
