import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import NewDriver from '../NewDriver';
import store from '../../../redux/store';
import { MemoryRouter } from 'react-router-dom';
import userEvent from '@testing-library/user-event'; 
import { act } from 'react-dom/test-utils';

// Mock de Redux store
const mockStore = configureStore([]);

const renderForm = async () => {
  render(
    <Provider store={store}>
      <MemoryRouter>
        <NewDriver />
      </MemoryRouter>
    </Provider>
  );
  // Esperar a que el componente se renderice completamente
   
};

describe('NewDriver Component', () => {
  let store;

  beforeEach(() => {
    store = mockStore({
      teams: [],
      drivers: [],
      originalDrivers: [],
      driverDetail: [],
      message: 'Nothing',
      status: 'save',
      buttonDisabled: true,
      formData: {},
      originFilter: 'ALL',
      sortBy: 'Reset All',
      sortOrder: 'asc',
      teamFilter: 'Select Team',
      currentPage: 1,
      driversPerPage: 9,
      storedPage: '',
      totalPages: 1,
      isLoading: false,
    });
  });
  
  it('should dispatch action to save new driver on button click', async () => {
   // await act(async () => {
      await renderForm();
      // Simula el cambio en el formulario
   // });
    
    fireEvent.change(screen.getByTestId('forename'), { target: { value: 'Josue' } });
    fireEvent.change(screen.getByTestId('lastname'), { target: { value: 'Sanchez' } });
    fireEvent.change(screen.getByTestId('dob'), { target: { value: '2023-01-03' } });
    // Simula la selección de opciones en el campo 'Teams'
 
     // userEvent.selectOptions(screen.getByTestId('teamsSelectOption'), ['Mercedes']);
   //  expect(screen.getByTestId('teamsSelectOption')).toBeInTheDocument('Mclaren');

 
   // Simula el cambio en otros campos del formulario
   fireEvent.change(screen.getByTestId('description'), { target: { value: 'Best Driver!' } });
   fireEvent.change(screen.getByTestId('nationality'), { target: { value: 'Paraguay' } });
   fireEvent.change(screen.getByTestId('image'), { target: { value: '' } });
   
  // Simula el clic en el botón de guardar
  // Buscar el botón por su data-testid
  const inputForm= {teams:['McLaren']};
  //const inputForm = ['Mercedes', 'Ferrari'];

  // Encuentra el elemento del campo select por su atributo data-testid
  const selectField = screen.getByTestId('teams');
  
  // Establece directamente el valor del campo
  selectField.value = inputForm.teams;
  
  // Dispara un evento de cambio manualmente si es necesario
  selectField.dispatchEvent(new Event('change'));
  //fireEvent.change(screen.getByTestId('teamsMessage'), { target: { value: errorMessage } });
  //fireEvent.change(screen.getByTestId('teams'), { target: { value: inputForm } });
  const button = screen.getByTestId('save');
  
  // Hacer clic en el botón dentro de un bloque de act
  act(() => {
    fireEvent.click(button);
  });
  
  
 
   
  
    // Esperar hasta que la condición se cumpla antes de verificar la ubicación
    await waitFor(() => {
      // Verificar que ciertos elementos esperados se renderizan después del click

      expect(screen.getByText('McLaren')).toBeInTheDocument();
      const updatedStatus = store.getState().status;
      expect(updatedStatus).toBe('save');
      
  });  
  }); 
 });