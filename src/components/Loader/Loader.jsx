// Loader.js
import React from 'react';
import style from './Loader.module.scss';

const Loader = () => (
  <div className={style["loader-container"]}>
    {/* Puedes agregar aquí la animación o mensaje de carga */}
    Loading...
  </div>
);

export default Loader;
