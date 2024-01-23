import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewDriver from '../NewDriver'; // Ajusta la ruta según la estructura de tu proyecto
import { Provider } from 'react-redux';
import store from '../../../redux/store';
import { MemoryRouter } from 'react-router-dom';

const renderForm = async()=>{
  render(
    <Provider store={store}>
      <MemoryRouter>
        <NewDriver />
      </MemoryRouter>
    </Provider>
  );
  return render;
}

describe('NewDriver Form Validations', () => {
  it('Displays error message for  empty name', async () => {
   
    await renderForm();

   fireEvent.change(screen.getByTestId('forename'), { target: { value: '' } });
    fireEvent.click(screen.getByTestId('save'));

    expect(screen.getByTestId('forenameMessage')).toBeInTheDocument('Name is empty, please write a valid name!');
  });

  it('Displays error message for name with simbols', async() => {
        await renderForm();
    
   fireEvent.change(screen.getByTestId('forename'), { target: { value: 'Jhon@' } });
    fireEvent.click(screen.getByTestId('save'));

    expect(screen.getByTestId('forenameMessage')).toBeInTheDocument('Name is empty, please write a valid name!');
  });

  it('Displays error message for  empty lastname', async() => {
    await renderForm();

    fireEvent.change(screen.getByTestId('lastname'), { target: { value: '' } });
    fireEvent.click(screen.getByTestId('save'));

expect(screen.getByTestId('lastnameMessage')).toBeInTheDocument('Lastname is empty, please write a valid lastname!');
});

it('Displays error message for lastname with simbols', async() => {
  await renderForm();

  fireEvent.change(screen.getByTestId('lastname'), { target: { value: 'Smith@' } });
  fireEvent.click(screen.getByTestId('save'));

expect(screen.getByTestId('lastnameMessage')).toBeInTheDocument('The lastname cannot contain symbols.');
});

it('Displays error message for nationality when is empty', async() => {
  await renderForm();

  fireEvent.change(screen.getByTestId('nationality'), { target: { value: '' } });
  fireEvent.click(screen.getByTestId('save'));

expect(screen.getByTestId('nationalityMessage')).toBeInTheDocument('Nationality is empty, please write a valid nationality!');
});

it('Displays error message for date of birth when is empty', async() => {
  await renderForm();

  fireEvent.change(screen.getByTestId('dob'), { target: { value: '' } });
  fireEvent.click(screen.getByTestId('save'));

expect(screen.getByTestId('dobMessage')).toBeInTheDocument('Date of birth is empty, please select a valid date!');
});

it('Displays error message wrong format of date of birth', async() => {
  await renderForm();


   
  fireEvent.change(screen.getByTestId('dob'), { target: { value: '2000/05/30' } });
   
   

  fireEvent.click(screen.getByTestId('save'));

expect(screen.getByTestId('dobMessage')).toBeInTheDocument('Invalid date format. Use YYYY/MM/DD, DD/MM/YYYY, MM/DD/YYYY o YYYY-MM-DD');
});

it('Displays error message select at leat one team', async() => {
  await renderForm();


   
  fireEvent.change(screen.getByTestId('teams'), { target: { value: [] } });
   
   

  fireEvent.click(screen.getByTestId('save'));

expect(screen.getByTestId('teamsMessage')).toBeInTheDocument('Teams is empty, please select at least one team!');
});
  // Agrega más pruebas según sea necesario para otras validaciones
});
