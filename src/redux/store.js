// store.js
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import rootReducer from './reducer'; // Asegúrate de importar tu reducer aquí

const store = createStore(
  rootReducer,
  applyMiddleware(thunk)
);

export default store;
