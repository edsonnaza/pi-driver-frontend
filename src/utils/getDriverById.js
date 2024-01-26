// getDataById.js

import axios from 'axios';

//const URL = 'http://localhost:3003/drivers/';

const getDriverById = async (idDriver) => {

  try {
    const response = await axios(`/drivers/${idDriver}`);
    const data = response.data;
    console.log('getDriverById.js:',data)
    if (data.forename) {
      console.log('Function getDriverById:', data);
      return data
      //return { data: data, message: 'success' };
      //return [data]; // Devolver un array con un solo elemento para que coincida con la estructura esperada
    } else {
      console.log('Error sin datos en getDriverById:',data.response.data);
     // return { drivers: [data], message: 'Driver found' };
      return { drivers: [], message: data.response.data };
    }
  } catch (error) {
    console.error('Error in getDriverById:', error.response.data);
    return { drivers: [], message: error.response.data };
  }
};

export default getDriverById;
