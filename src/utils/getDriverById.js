// getDataByName.js

import axios from 'axios';

const URL = 'http://localhost:3003/drivers/';

const getDriverById = async (driverId,setDriverDetail) => {
  try {


    axios(`${URL}${driverId}`).then(({ data }) => {
      if (data.forename) {
        setDriverDetail(data);
       
      } else {
        setResponseData(false);
        setErrBarMessage(`Driver not found: ${drivername}`);
        // window.alert('¡Character not found with the ID!'+ id);
      }
    }).catch(error => console.log(error));
  } catch (error) {
    console.log(error);
  }
};

export default getDriverById;
