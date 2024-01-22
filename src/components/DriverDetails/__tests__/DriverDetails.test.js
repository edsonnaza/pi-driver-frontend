import { act, render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import DriverDetails from '../DriverDetails';
import configureStore from 'redux-mock-store';
import { actionGetDriverDetailById } from '../../../redux/actions';  
import thunk from 'redux-thunk';

const middlewares = [thunk];
const mockStore = configureStore(middlewares);

// Mock de la acción asíncrona
jest.mock('../../../redux/actions', () => ({
  ...jest.requireActual('../../../redux/actions'),
  actionGetDriverDetailById: jest.fn(),
}));

// Datos simulados
const initialState = {
  driverDetail: [
    {
      id: 1,
      forename: 'Lewis',
      lastname: 'Hamilton',
      nationality: 'British',
      dob: '1985-01-07',
      teams: ['McLaren', 'Mercedes'],
      image_url: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
      description: 'Sir Lewis Carl Davidson Hamilton MBE HonFREng (born 7 January 1985) is a British racing driver...',
      api: true,
    },
  ],
  isLoading: false,
};
const store = mockStore(initialState);

// Función para renderizar el componente dentro de act
const renderDriverDetailsComponent = async () => {
  // Actuar sobre la acción asíncrona dentro de act
  await act(async () => {
    // Configurar la implementación del mock
    actionGetDriverDetailById.mockImplementation(() => ({
      type: 'GET_DRIVER_DETAIL_BY_ID',
      payload: {
        drivers: [
          {
            id: 1,
            forename: 'Lewis',
            lastname: 'Hamilton',
            nationality: 'British',
            dob: '1985-01-07',
            teams: ['McLaren', 'Mercedes'],
            image_url: 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg',
            description: 'Sir Lewis Carl Davidson Hamilton MBE HonFREng (born 7 January 1985) is a British racing driver...',
            api: true,
          },
        ],
        message: 'Success',
      },
    }));
    
    render(
      <Provider store={store}>
        <MemoryRouter initialEntries={['/driver/1']}>
          <Routes>
            <Route path="/driver/:id" element={<DriverDetails />} />
          </Routes>
        </MemoryRouter>
      </Provider>
    );
  });
};

describe('DriverDetails Component', () => {

  // Bloque it para probar el renderizado y la acción asíncrona
  it('Renders DriverDetails component with correct data id ', async () => {
    // Llamar a la función de renderizado
    await renderDriverDetailsComponent();

    // Realizar las aserciones después de act
    expect(actionGetDriverDetailById).toHaveBeenCalledWith('1');
    //expect(screen.getByTestId('DriverDetails')).toBeInTheDocument();
  });

  //https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg'
 // Bloque it para probar el renderizado y la acción asíncrona
 it('Display with correct url image data ', async () => {
  // Llamar a la función de renderizado
  await renderDriverDetailsComponent();

  // Obtener el elemento de imagen por su atributo alt
  const imgElement = screen.getByAltText('Lewis');

  // Realizar las aserciones sobre el atributo src del elemento de imagen
  expect(imgElement).toBeInTheDocument();
  expect(imgElement).toHaveAttribute('src', 'https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg');
});


  // Bloques it adicionales para otras aserciones
  it('Displays the name correctly', async () => {
    // Llamar a la función de renderizado
    await renderDriverDetailsComponent();
    expect(screen.getByText('Lewis Hamilton')).toBeInTheDocument();
  });

  it('Displays the nationality correctly', async () => {
    // Llamar a la función de renderizado
    await renderDriverDetailsComponent();
    expect(screen.getByText('British')).toBeInTheDocument();
  });

  it('Displays the date of birth correctly', async () => {
    // Llamar a la función de renderizado
    await renderDriverDetailsComponent();
    expect(screen.getByText('1985-01-07')).toBeInTheDocument();
  });

  it('Displays the teams correctly', async () => {
    // Llamar a la función de renderizado
    await renderDriverDetailsComponent();
    expect(screen.getByText('McLaren, Mercedes.')).toBeInTheDocument();
  });
});
