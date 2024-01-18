import { render, screen } from '@testing-library/react';
import NewDriver from '../NewDriver';

test('renders learn react link', () => {
  render(<NewDriver />);
  const linkElement = screen.getByText(/Prueba de test!/i);
  expect(linkElement).toBeInTheDocument();
});