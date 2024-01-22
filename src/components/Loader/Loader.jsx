// Loader.js
import React from 'react';
import style from './Loader.module.scss';
import spinner from '../../assets/spinner.svg';

const Loader = () => (
  <div className={style["loader-container"]}>
    {/* Puedes agregar aquí la animación o mensaje de carga */}
    Loading...
   <img className={style.spinner} src={spinner} alt="Spinner" />
  </div>
);

export default Loader;
