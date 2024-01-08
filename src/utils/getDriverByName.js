// getDataByName.js

import axios from 'axios';

const URL = 'http://localhost:3003/drivers/';

const getDriverByName = async (drivername, setResponseData, setErrBarMessage, setDrivers) => {
  try {
   // const exists = ''; // drivers.find(char => char.id === Number(id));

    // if (exists) {
    //   setResponseData(false);
    //   setErrBarMessage('The driver has been added already!');
    //   setPreImg([{ image: '', name: '' }]);
    //   return;
    // }

    axios(`${URL}?name=${drivername}`).then(({ data }) => {
      if (data[0].forename) {
        setDrivers(data);
        console.log('funcion by Name:',data);
        // setDrivers((oldDriver) => [...oldDriver, data]);
        // dispatch(allCharacters(data));
        // setPreImg(PreIMG_INIT);
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

export default getDriverByName;
