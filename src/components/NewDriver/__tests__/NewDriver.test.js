import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import NewDriver from './NewDriver';

test('Renderiza correctamente el componente NewDriver', () => {
  render(<NewDriver />);

  // Realiza afirmaciones sobre el contenido renderizado, por ejemplo:
  expect(screen.getByText('Create New Driver')).toBeInTheDocument();
  expect(screen.getByLabelText('Name:')).toBeInTheDocument();
  // Añade más afirmaciones según tu estructura de componente
});

test('Envía el formulario correctamente', async () => {
  render(<NewDriver />);

  // Simula la interacción del usuario completando el formulario
  fireEvent.change(screen.getByLabelText('Name:'), { target: { value: 'John' } });
  // Añade más simulaciones de eventos según tu formulario

  // Dispara el envío del formulario
  fireEvent.click(screen.getByText('Save'));

  // Espera a que se complete la lógica asíncrona (si la hay)
  await waitFor(() => {
    // Realiza afirmaciones sobre el estado después de enviar el formulario
    expect(screen.getByText('Driver saved successfully!')).toBeInTheDocument();
  });
});
