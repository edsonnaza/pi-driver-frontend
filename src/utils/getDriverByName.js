// getDataByName.js

import axios from 'axios';

const URL = 'http://localhost:3003/drivers/';

const getDriverByName = async (drivername) => {
  try {
    const response = await axios(`${URL}?name=${drivername}`);
    const data = response.data;

    if (data && data.length > 0 && data[0].forename) {
      console.log('Function getDriverByName:', data);
      return data;
    } else {
      console.log('No drivers found');
      return [error.response.data];
    }
  } catch (error) {
    console.error('Error in getDriverByName:', error.response.data);
    return [];
  }
};

export default getDriverByName;
