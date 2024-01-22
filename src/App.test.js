import { render, screen, waitFor,fireEvent, userEvent } from '@testing-library/react';
import { BrowserRouter as Router , Route, Routes,RouterProvider, createMemoryRouter,MemoryRouter} from 'react-router-dom';
import { createMemoryHistory } from 'history';
import { act } from 'react-dom/test-utils'
import { Provider } from 'react-redux';
import configureStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import App from './App';
import HomePage from './components/HomePage/HomePage';
import AboutPage from './components/About/AboutPage';
import NewDriver from './components/NewDriver/NewDriver';
import WelcomePage from './components/WelcomePage/WelcomePage';
import DriverDetails from './components/DriverDetails/DriverDetails';

const mockStore = configureStore([thunk]);

const initialState = {
    teams:[
        "McLaren",
        "Prost",
        "Sauber",
        "Mercedes",
        "Williams",
        "BMW Sauber",
        "Jordan",
        "Renault",
        "Minardi",
        "Ferrari",
        "Alpine",
        "Lotus",
        "Caterham",
        "Toro Rosso",
        "Alfa Romeo",
        "Alfa Romeo Racing",
        "Toyota",
        "Marussia",
        "BAR",
        "Virgin",
        "Super Aguri",
        "Red Bull",
        "Spyker",
        "Force India",
        "Porsche",
        "Mercedes AMG",
        "Aston Martin",
        "Benetton",
        "Stewart",
        "Honda",
        "Brawn",
        "Joest Racing",
        "Peugeot",
        "Midland",
        "Hispania",
        "Jaguar",
        "Courage Compétition",
        "HRT",
        "DAMS",
        "Team Oreca",
        "Pescarolo Sport",
        "Arrows",
        "Peugeot Total",
        "Simtek",
        "Ligier",
        "Footwork",
        "Tyrrell",
        "Forti",
        "Brabham",
        "Italia",
        "Lola",
        "MasterCard Lola",
        "Larrousse",
        "Pacific",
        "Zakspeed",
        "AGS",
        "Coloni",
        "EuroBrun",
        "Andrea Moda",
        "Leyton House",
        "March",
        "Onyx",
        "Rial",
        "Toleman",
        "Osella",
        "Fondmetal",
        "RAM",
        "Shadow",
        "Modena",
        "ATS",
        "Theodore",
        "Ensign",
        "Spirit",
        "Brabham y Onyx",
        "Life",
        "Haas",
        "Sauber y Caterham",
        "Hesketh",
        "Haas Lola",
        "Martini",
        "Surtees",
        "Renault F1",
        "Wolf",
        "Fittipaldi",
        "Iso-Marlboro",
        "Hill",
        "BRM",
        "Boro",
        "Parnelli",
        "Penske",
        "Rebaque",
        "Frank Williams Racing Cars",
        "Brands Hatch",
        "Iso–Marlboro",
        "Wolf–Williams",
        "Merzario",
        "Kauhsen",
        "Cooper",
        "BS",
        "Eifelland",
        "Penske & Shadow",
        "Maki",
        "ShellSport",
        "Truesports",
        "Kraco",
        "Rahal-Hogan",
        "Galles-Kraco",
        "Team Rahal",
        "Gunston",
        "Lexington",
        "Token",
        "Amon",
        "LEC",
        "McGuire",
        "Ian Raby",
        "Connew",
        "AAW",
        "Maserati",
        "De Tomaso",
        "ENB",
        "Scuderia Ferrari",
        "North American Racing Team",
        "Shannon",
        "UDT",
        "Vanwall",
        "EMW",
        "Kurtis Kraft",
        "Kuzma",
        "Racing Team Holland",
        "HWM",
        "Gilera",
        "Heros Racing",
        "Matra",
        "S.A.N",
        "LDS",
        "Bonnier",
        "Alfa Special",
        "Castrol",
        "DW Racing Enterprises",
        "Automobili Turismo e Sport",
        "BRP",
        "Camoradi",
        "Rosier",
        "Scuderia Ugolini",
        "Stebro",
        "Pawl",
        "Porsche System Engineering",
        "Mercedes-Benz",
        "MBM",
        "Talbot-Lago",
        "Reg Parnell",
        "Tecno",
        "Lyncar",
        "Finotto",
        "Rob Walker",
        "Rob Walker Racing Team",
        "UDT Laystall",
        "Fry",
        "non-works BRM",
        "Filipinetti",
        "BMW",
        "Serenissima",
        "Scirocco",
        "Watson",
        "Canadian Stebro Racing",
        "Auguste Vaillet",
        "JBW",
        "NSU",
        "Jolly Club",
        "Wolf-Williams",
        "Trojan",
        "Team Lotus",
        "Centro Sud",
        "Eagle",
        "Anglo American Racers",
        "Scarab",
        "Bob Gerard Racing",
        "Yeoman",
        "Gilby",
        "Bugatti",
        "Derrington-Francis",
        "Lesovsky",
        "Veritas",
        "MZ",
        "Ferguson",
        "Norton",
        "Kojima",
        "Mapfre",
        "Scuderia Finotto",
        "NART",
        "Bellasi",
        "Reg Parnell Racing",
        "Scuderia Centro Sud",
        "Protos",
        "Ace Garage",
        "RE",
        "Gordini",
        "Ecurie Maarsbergen",
        "Emeryson",
        "Bromme",
        "Connaught",
        "MV Agusta",
        "Benelli"],
    drivers: [{
        "id": 1,
        "forename": "Lewis",
        "lastname": "Hamilton",
        "nationality": "British",
        "dob": "1985-01-07",
        "teams": [
            "McLaren",
            "Mercedes"
        ],
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg",
        "description": "Sir Lewis Carl Davidson Hamilton MBE HonFREng (born 7 January 1985) is a British racing driver currently competing in Formula One, driving for Mercedes-AMG Petronas Formula One Team. In Formula One, Hamilton has won a joint-record seven World Drivers' Championship titles (tied with Michael Schumacher), and holds the records for the most wins (103), pole positions (103), and podium finishes (191), among many others. He is statistically considered as the most successful driver in Formula One history.",
        "api": true
    }],
    originalDrivers:[{
        "id": 1,
        "forename": "Lewis",
        "lastname": "Hamilton",
        "nationality": "British",
        "dob": "1985-01-07",
        "teams": [
            "McLaren",
            "Mercedes"
        ],
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg",
        "description": "Sir Lewis Carl Davidson Hamilton MBE HonFREng (born 7 January 1985) is a British racing driver currently competing in Formula One, driving for Mercedes-AMG Petronas Formula One Team. In Formula One, Hamilton has won a joint-record seven World Drivers' Championship titles (tied with Michael Schumacher), and holds the records for the most wins (103), pole positions (103), and podium finishes (191), among many others. He is statistically considered as the most successful driver in Formula One history.",
        "api": true
    }],
    driverDetail:[{
        "id": 1,
        "forename": "Lewis",
        "lastname": "Hamilton",
        "nationality": "British",
        "dob": "1985-01-07",
        "teams": [
            "McLaren",
            "Mercedes"
        ],
        "image_url": "https://upload.wikimedia.org/wikipedia/commons/1/18/Lewis_Hamilton_2016_Malaysia_2.jpg",
        "description": "Sir Lewis Carl Davidson Hamilton MBE HonFREng (born 7 January 1985) is a British racing driver currently competing in Formula One, driving for Mercedes-AMG Petronas Formula One Team. In Formula One, Hamilton has won a joint-record seven World Drivers' Championship titles (tied with Michael Schumacher), and holds the records for the most wins (103), pole positions (103), and podium finishes (191), among many others. He is statistically considered as the most successful driver in Formula One history.",
        "api": true
    }],
    message: 'Nothing',
    status:'',
    buttonDisabled:false,
    formData:{},
    originFilter:'ALL', 
    sortBy:"Reset All",
    sortOrder:"asc",
    teamFilter:"Select Team",
    currentPage:1,
    driversPerPage:9,
    storedPage:"",
    totalPages:1,
    isLoading:false,
  
  };

describe('App Component Test', () => {
  

  it('Expect to see:  Welcome to formula one world ', async () => {
    const initialState = {
      isLoading: false,
    };

    const mockDispatch = jest.fn();

    jest.mock('react-redux', () => ({
      ...jest.requireActual('react-redux'),
      useDispatch: () => mockDispatch,
    }));

    render(
      <Provider store={mockStore(initialState)}>
        <Router initialEntries={['/']}>
          <App />
        </Router>
      </Provider>
    );

    await waitFor(() => {
     expect(screen.getByText(/Welcome to formula one world/i)).toBeInTheDocument();
      
    });
  });

 

  it('Does not render Loader when isLoading is false', async () => {
    const initialState = {
      isLoading: false,
    };

    const mockDispatch = jest.fn();

    jest.mock('react-redux', () => ({
      ...jest.requireActual('react-redux'),
      useDispatch: () => mockDispatch,
    }));

    render(
      <Provider store={mockStore(initialState)}>
        <Router>
          <App />
        </Router>
      </Provider>
    );

    expect(screen.queryByText('Loading...')).toBeNull();
  });

  it('Does not render NavBar when the route is root "/"', async () => {
    const initialState = {
      isLoading: false,
    };

    const mockDispatch = jest.fn();

    jest.mock('react-redux', () => ({
      ...jest.requireActual('react-redux'),
      useDispatch: () => mockDispatch,
    }));

    render(
      <Provider store={mockStore(initialState)}>
        <Router initialEntries={['/']}>
          <App />
        </Router>
      </Provider>
    );

    expect(screen.queryByTestId('navbar')).toBeNull();
  });

  test('Render Home Page Component with the route "/home"', async () => {
    // Simula el estado global de Redux con datos de conductores
     
  
      const mockDispatch = jest.fn();
  
      jest.mock('react-redux', () => ({
        ...jest.requireActual('react-redux'),
        useDispatch: () => mockDispatch,
      }));
  
     
  
      
    render(
        <Provider store={mockStore(initialState)}>
      <Router initialEntries={[`/home`]}>
        
          <HomePage />
      
      </Router>
      </Provider>
    );
  
    expect(screen.getByTestId('homeContainer')).toBeInTheDocument();
  });
  
  test('Render About Page Component with the route "/about"', async () => {
        // Simula el estado global de Redux con datos de conductores
       
      
          const mockDispatch = jest.fn();
      
          jest.mock('react-redux', () => ({
            ...jest.requireActual('react-redux'),
            useDispatch: () => mockDispatch,
          }));
   
    render(
        <Provider store={mockStore(initialState)}>
      <Router initialEntries={[`/about`]}>
        
          <AboutPage />
      
      </Router>
      </Provider>
    );

   
  
   expect(screen.getByTestId('AboutPage')).toBeInTheDocument();
  });

  test('Render Driver Detail Component with the route "/driver:id"', async () => {
    
      const mockDispatch = jest.fn();
  
      jest.mock('react-redux', () => ({
        ...jest.requireActual('react-redux'),
        useDispatch: () => mockDispatch,
      }));

      const id = 1;

render(
    <Provider store={mockStore(initialState)}>
    <MemoryRouter initialEntries={[`/details/${id}`]}>
      <Routes>
        <Route path="/details/:id" element={<DriverDetails />} />
      </Routes>
    </MemoryRouter>
  </Provider>
);



expect(screen.getByTestId('DriverDetails')).toBeInTheDocument();
});


test('Render New Driver Component with the route "/driver"', async () => {
    // Simula el estado global de Redux con datos de conductores
 
  
      const mockDispatch = jest.fn();
  
      jest.mock('react-redux', () => ({
        ...jest.requireActual('react-redux'),
        useDispatch: () => mockDispatch,
      }));

   

render(
    <Provider store={mockStore(initialState)}>
    <MemoryRouter initialEntries={['/driver']}>
      <Routes>
        <Route path="driver" element={<NewDriver />} />
      </Routes>
    </MemoryRouter>
  </Provider>
);



expect(screen.getByTestId('NewDriverPage')).toBeInTheDocument();
});

it('Render Home Page Component with the route click in button Engine "/"', async () => {
 // Renderizar WelcomePage
 render(
    <Provider store={mockStore(initialState)}>
      <MemoryRouter initialEntries={['/']}>
        <Routes>
          <Route path="/" element={<WelcomePage />} />
          <Route path="/home" element={<HomePage />} />
        </Routes>
      </MemoryRouter>
    </Provider>
  );

  // Buscar el botón por su data-testid
  const button = screen.getByTestId('EngineButton');

  // Hacer clic en el botón dentro de un bloque de act
  act(() => {
    fireEvent.click(button);
  });

  // Esperar hasta que la condición se cumpla antes de verificar la ubicación
  await waitFor(() => {
    // Verificar que ciertos elementos esperados se renderizan después del click
    expect(screen.getByTestId('homeContainer')).toBeInTheDocument();
    
});  });  });

