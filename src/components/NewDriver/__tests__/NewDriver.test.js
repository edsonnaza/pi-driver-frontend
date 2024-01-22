import { render, screen } from '@testing-library/react';
import NewDriver from '../NewDriver';

it('loads teams from the database', async () => {
  // Renderiza el componente
  await render(
    <Provider store={store}>
      <MemoryRouter initialEntries={['/new-driver']}>
        <Routes>
          <Route path="/new-driver" element={<NewDriver />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  // Realiza aserciones para verificar la carga de equipos
  // Puedes usar expect(getByLabelText('Teams')).toHave... para verificar las opciones del select
  // Asegúrate de que escuderiasOptions se haya cargado correctamente en el estado del componente
});
