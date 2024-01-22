// utils/getTeams.js
import axios from 'axios';
const URL = 'http://localhost:3003/teams';

const getTeams = async () => {
  try {
    const response = await axios.get(URL);
   
    return response.data;
  } catch (error) {
    console.log('Error fetching Teams:', error);
    throw error; // Puedes manejar el error según tus necesidades
  }
};

export default getTeams;
