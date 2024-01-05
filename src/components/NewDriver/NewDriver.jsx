import React, { useState, useEffect } from 'react';
import axios from 'axios';
import getTeams from '../../utils/getTeams';
import style from './NewDriver.module.scss';
import { Link } from 'react-router-dom';
 
const newDriver = () => {
 
  const [teamColors, setTeamColors] = useState({});
  const initialFormData = {
    forename: '',
    lastname: '',
    nationality: '',
    image: '',
    dob: '',
    description: '',
    teams: [],
    buttonDisabled: false,
    status: 'Save'
  };

  const [formData, setFormData] = useState({...initialFormData});
 
  const [escuderiasOptions, setEscuderiasOptions] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teams = await getTeams();
      
        setEscuderiasOptions(teams.map(escuderia => escuderia));
      } catch (error) {
        // Manejar el error según tus necesidades
        console.error('Error obteniendo escuderías:', error);
      }
    };

    fetchTeams();
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value, status:'Save', buttonDisabled:false });
  };

  const handleEscuderiaChange = (e) => {
    const selectedEscuderias = Array.from(e.target.selectedOptions, (option) => option.value);
    setFormData({ ...formData, teams: selectedEscuderias });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Aquí puedes agregar la lógica para enviar los datos a la API.
    try {
      const response = await axios.post('http://localhost:3003/drivers', formData,  setFormData({ ...formData, buttonDisabled: true, status:'Submitting...' }),
      {
        headers: {
          'Content-Type': 'application/json', // Puedes agregar otros encabezados si es necesario
        },
       
      });

      if (response.status === 201) {
        // Éxito
        console.log('Respuesta de la API:', response.data);
        setFormData({ ...initialFormData, buttonDisabled:true, status:'Saved' })
       

        // Puedes agregar más lógica aquí después de la creación exitosa del driver
      } else {
        // Si el servidor responde con un código de error
        console.error('Error en la respuesta de la API:', response.status, response.data);
      }

      // Puedes agregar más lógica aquí después de la creación exitosa del driver
    } catch (error) {
      console.error('Error al enviar el formulario:', {error:error.message});
      // Puedes manejar el error según tus necesidades
    }
  };

  const validateForm = () => {
    // Agrega tus propias reglas de validación aquí
    // Por ejemplo, aquí se verifica que el nombre no contenga símbolos
    if (/[^a-zA-Z\s]/.test(formData.forename)) {
      alert('The name cannot contain symbols.');
      return false;
    }
    if (/[^a-zA-Z\s]/.test(formData.lastname)) {
      alert('The lastname cannot contain symbols.');
      return false;
    }

    if(formData.forename===''){
      alert('Name is empty, please write a valid name!')
      return false;
    }
    if(formData.lastname===''){
      alert('Lastname is empty, please write a valid lastname!')
      return false;
    }
    if(formData.dob===''){
      alert('Date of birth is empty, please select a valid date!')
      return false;
    }
     console.log(formData.dob);
 
     const regex = /^(?:(?:19|20)\d\d|21[0-9]{2})[-/](0[1-9]|1[0-2])[-/](0[1-9]|[12][0-9]|3[01])$|^([0-2][0-9]|3[01])[-/](0[1-9]|1[0-2])[-/](?:19|20)\d\d$/;

     if (!regex.test(formData.dob)) {
       alert('Invalid date format. Use YYYY/MM/DD, DD/MM/YYYY, MM/DD/YYYY o YYYY-MM-DD');
       return false;
     }
   
     const parts = formData.dob.split(/[-/]/);
     const year = parseInt(parts[0], 10);
     const month = parseInt(parts[1], 10);
     const day = parseInt(parts[2], 10);
   
     if (isNaN(year) || isNaN(month) || isNaN(day)) {
       alert('Invalid date format. Use YYYY/MM/DD, DD/MM/YYYY, MM/DD/YYYY o YYYY-MM-DD');
       return false;
     }
   
    return true;
  };

  const handleCreateDriver = (e) => {
    e.preventDefault();
    if (validateForm(e)) {
      handleSubmit(e);
    }
  };

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  const assignColorToTeam = (team) => {
    // Si el equipo ya tiene un color asignado, devolver ese color
    if (teamColors[team]) {
      return teamColors[team];
    } else {
      // Si no tiene un color asignado, generar uno nuevo y guardarlo en el historial
      const newColor = getRandomColor();
      setTeamColors((prevColors) => ({ ...prevColors, [team]: newColor }));
      return newColor;
    }
  };
  
  const selectedTeamsDisplay = formData.teams.join(', ');
  return (
    <form className={style.form} onSubmit={handleCreateDriver}  >
     <div className={style.title}> Create New Driver</div>
 
      <hr />
      <p>
      <label htmlFor='forename'> Name: </label>
      <input type="text" name="forename" value={formData.forename} onChange={handleInputChange} required />

      </p>
       
  
      <p>
      <label htmlFor='lastname'>Lastname:</label>
       
        <input type="text" name="lastname" value={formData.lastname} onChange={handleInputChange} required />
     
      </p>
        <p> 

      <label htmlFor='nationality'> Nationality:</label>
        
        <input type="text" name="nationality" value={formData.nationality} onChange={handleInputChange} required />
     
        </p>
     
     <p> 

        <label htmlFor='image'>Image:  </label>
        <input type="text" name="image" value={formData.image} onChange={handleInputChange}   />
    
     </p>
      <p> 

      <label htmlFor='dob'>Date of birth:</label>
       
        <input type="date" name="dob" value={formData.dob} onChange={handleInputChange} required />
    
      </p>
  <p> 

      <label htmlFor='description'>Description:</label>
       
        <textarea name="description" value={formData.description} onChange={handleInputChange} required />
    
  </p>
       
<p> 
      <label htmlFor='teams'>Teams:  </label>   
      <br />
      {formData.teams.map((team, index) => (
          <span
            key={index}
            className={style.selectedTeams}
            style={{ backgroundColor: assignColorToTeam(team) }}
          >
            {team}
          </span>
        ))}
        
        
        <select multiple name="teams" value={formData.teams} onChange={handleEscuderiaChange} required>
          {escuderiasOptions.map((escuderia, index) => (
            <option key={index} value={escuderia}>
              {escuderia}
            </option>
          ))}
        </select>
        <span className={style.multlipleChoice}>Press Ctrl or Command for multiple selection</span>
    </p>
   
    <p className={style.savedMessage}>{formData.status==='Saved' && 'Driver saved successfully!'}</p>
   
      <div className={style.actions}>
      <Link to='/home'>
      <button className={style.buttonCancel}   type="submit">{formData.status==='Saved' ? 'Home' : 'Cancel'}</button>
     </Link>
        <button className={style.button} disabled={formData.buttonDisabled} type="submit">{formData.status}</button>
    </div>
    </form>
  );
};

export default newDriver;
