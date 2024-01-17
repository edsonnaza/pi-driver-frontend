import getDriverById from './getDriverById';
import getDriverByName from './getDriverByName';
const getAllDrivers = async (searchInput) => {
  try {
    let data;

   // Verificar si searchInput es un número o tiene el formato de un UUID
   const isNumericOrUUID = !isNaN(searchInput) || /^[0-9a-fA-F-]{36}$/.test(searchInput);

   if (isNumericOrUUID && searchInput !== "") {
 
      // Si searchInput es un número o se puede convertir a un número, buscar por ID
     data = await getDriverById(searchInput);
      console.log('Datos de getDriverById',data);
      return data;
     // return { drivers: data, message: 'success' };
    } else if (typeof searchInput === "string" || searchInput === "") {
      // Si searchInput es una cadena o está vacío, buscar por nombre
      data = await getDriverByName(searchInput);
      console.log('Datos de getDriverByName:',data)
      return data;
      //return { drivers: data, message: 'success' };
    } else {
      // Manejar cualquier otro tipo de input
      console.log('Invalid input type:', typeof searchInput);
      return { drivers: [], message: 'Invalid input type' };
    }

    // Verificar si se encontraron datos y si hay al menos un conductor
    // if (data[0].data && Array.isArray(data[0].data) && data[0].data.length > 0 && data[0].forename) {
    //   console.log('Function getAllDrivers:', data);
    //   return { drivers: data, message: 'success' };
    // } else {
    //   console.log('Drivers not found');
    //   return { drivers: [], message: `Id ${searchInput} driver not found` };
    // }
  } catch (error) {
    console.error('Error in getAllDrivers:', error);
    return { drivers: [], message: 'Error in getAllDrivers' };
  }
};


export default getAllDrivers;
