import axios from 'axios';
import getTeams from '../../../utils/getTeams';

jest.mock('axios');
const teamsData = [
    { id: 1, name: 'McLaren' },
    { id: 2, name: 'Prost' },
    // Agrega más datos de equipos según sea necesario
  ];
describe('getTeams', () => {
  it('Fetches successfully Teams data from an API', async () => {
   

    // Configura el mock de axios para simular una respuesta exitosa
    axios.get.mockResolvedValue({ data: teamsData });

    // Llama a la función getTeams y espera a que se resuelva
    const result = await getTeams();

    // Realiza las aserciones
   
    expect(result).toEqual(teamsData);
    // Agrega más aserciones según sea necesario
  });

  it('First Team name must be McLaren', async ()=>{
     // Configura el mock de axios para simular una respuesta exitosa
     axios.get.mockResolvedValue({ data: teamsData });

     // Llama a la función getTeams y espera a que se resuelva
     const result = await getTeams();
 
     // Realiza las aserciones
     expect(result[0]).toEqual( { id: 1, name: 'McLaren' });
  })

  it('Second Team name must be Prost', async ()=>{
    // Configura el mock de axios para simular una respuesta exitosa
    axios.get.mockResolvedValue({ data: teamsData });

    // Llama a la función getTeams y espera a que se resuelva
    const result = await getTeams();

    // Realiza las aserciones
    expect(result[1]).toEqual( { id: 2, name: 'Prost' });
 })

  // it('Handles errors when fetching data from an API', async () => {
  //   // Configura el mock de axios para simular un error en la respuesta
  //   axios.get.mockRejectedValue(new Error('Failed to fetch teams'));

  //   // Llama a la función getTeams y espera a que se rechace
  //   await expect(getTeams()).rejects.toThrow('Failed to fetch teams');
  //   // Puedes ajustar el mensaje de error según tu implementación
  // });
});
