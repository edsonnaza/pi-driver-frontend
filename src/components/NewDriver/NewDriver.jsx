import React, { useState, useEffect } from 'react';
import getTeams from '../../utils/getTeams';
import style from './NewDriver.module.scss';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreateNewDriver } from '../../redux/actions';
 
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
    buttonDisabled: true,
    status: 'Save',
    forenameMessage:'',
    lastnameMessage:'',
    nationalityMessage:'',
    imageMessage:'',
    dobMessage:'',
    descriptionMessage:'',
    teamsMessage:'',
    disabledSaveButtonTrueFalse:true
  };

  const dispatch = useDispatch();

  const [formData, setFormData] = useState({...initialFormData});
  const [validateMessage, setValidateMessage] =useState({

  });
 
  const [escuderiasOptions, setEscuderiasOptions] = useState([]);

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teams = await getTeams();
      
        setEscuderiasOptions(teams.map(escuderia => escuderia));
      } catch (error) {
        // Manejar el error  
        console.error('Error getting the teams:', error);
      }
    };

    fetchTeams();
  }, []);

  const handleInputChange = (e) => {
    console.log('Input change,',e.target.value)
    console.log('Event Key en Input Change:',e.key);
    setValidateMessage('');
    const { name, value } = e.target;
    const inputMessageKey = `${name}Message`;
    console.log('inputMessage',inputMessageKey);
    //setFormData({ ...formData, [name]: value, [inputMessageKey]:'',status:'Save' });
    setFormData((prevData) => ({ ...prevData, [name]: value, [inputMessageKey]:'',status:'Save' }));

    console.log('Teams desde handle input change:', formData.teams);
    // Lógica de validación para activar/desactivar el botón de guardar
    const isFormValid = formData.forename && formData.lastname && formData.nationality &&
                        formData.dob && formData.description && formData.teams.length > 0;

    setFormData((prevData) => ({ ...prevData, disabledSaveButtonTrueFalse: !isFormValid }));

    console.log('formData en hadle input change:',formData);
  };

  const handleEscuderiaChange = (e) => {
    const selectedEscuderias = Array.from(e.target.selectedOptions, (option) => option.value);
    console.log('Selected Team:', selectedEscuderias);
  
    setFormData((prevData) => ({ ...prevData, teams: selectedEscuderias }));
  
    // Asegúrate de que formData.teams sea un array antes de verificar su longitud
    const selectedTeamsDisplay = Array.isArray(formData.teams) && formData.teams.length ? formData.teams.join(', ') : '';
    console.log('formData después de actualizar:', formData.teams);
  };
  

  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Aquí puedes agregar la lógica para enviar los datos a la API..
     try {

      dispatch(actionCreateNewDriver(formData));
    
    } catch (error) {
      console.error('Error sending the data form:', {error:error.message});
      // Puedes manejar el error según tus necesidades
    }
  };

  const validateForm = () => {
    setValidateMessage('');
  
    if (/[^a-zA-Z\s]/.test(formData.forename)) {
      setFormData((prevData) => ({ ...prevData, forenameMessage: 'The name cannot contain symbols.' }));
      return false;
    }
  
    if (/[^a-zA-Z\s]/.test(formData.lastname)) {
      setFormData((prevData) => ({ ...prevData, lastnameMessage: 'The lastname cannot contain symbols.' }));
      return false;
    }
  
    if (formData.forename === '') {
      setFormData((prevData) => ({ ...prevData, forenameMessage: 'Name is empty, please write a valid name!' }));
      return false;
    }
  
    if (formData.lastname === '') {
      setFormData((prevData) => ({ ...prevData, lastnameMessage: 'Lastname is empty, please write a valid lastname!' }));
      return false;
    }
  
    if (formData.nationality === '') {
      setFormData((prevData) => ({ ...prevData, nationalityMessage: 'Nationality is empty, please write a valid nationality!' }));
      return false;
    }
  
    if (formData.dob === '') {
      setFormData((prevData) => ({ ...prevData, dobMessage: 'Date of birth is empty, please select a valid date!' }));
      return false;
    }
  
    const regex = /^(?:(?:19|20)\d\d|21[0-9]{2})[-/](0[1-9]|1[0-2])[-/](0[1-9]|[12][0-9]|3[01])$|^([0-2][0-9]|3[01])[-/](0[1-9]|1[0-2])[-/](?:19|20)\d\d$/;
  
    if (!regex.test(formData.dob)) {
      setFormData((prevData) => ({ ...prevData, dobMessage: 'Invalid date format. Use YYYY/MM/DD, DD/MM/YYYY, MM/DD/YYYY o YYYY-MM-DD' }));
      return false;
    }
  
    if (formData.description === '') {
      setFormData((prevData) => ({ ...prevData, descriptionMessage: 'Description is empty, please write a valid description!' }));
      return false;
    }
  
    if (formData.teams.length === 0) {
      setFormData((prevData) => ({ ...prevData, teamsMessage: 'Teams is empty, please select at least one team!' }));
      return false;
    }
  
    
    return true;
  };
  

 
  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      handleInputChange(event);
      handleCreateDriver(event);
    }
  };
  const handleCreateDriver = (event) => {
    console.log('create driver,', event)
    event.preventDefault();
    if (validateForm(event)) {
      handleSubmit(event);
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
  
  
  


 // Obtén el estado directamente en la función principal del componente
const buttonDisabled = useSelector((state) => state.buttonDisabled);
const status = useSelector((state) => state.status);

// Inicializa el estado al montar el componente
useEffect(() => {
  setFormData((prevData) => ({
    ...prevData,
    buttonDisabled,
    status
    
  }));
 
  const selectedTeamsDisplay = formData.teams.length ? formData.teams.join(', ') : '';
  console.log('Selected Teams Display:', selectedTeamsDisplay);
  console.log('formData después de actualizar:', formData.teams);
  console.log('forename useEffect:',formData.forename);

  // Lógica adicional si es necesario

}, [buttonDisabled, status, formData.teams,formData.disabledSaveButtonTrueFalse]);

 

  return (
    <form className={style.form} onSubmit={handleCreateDriver}  data-testid="NewDriverPage" >
     <div className={style.title}> Create New Driver</div>
 
      <hr />
      <p>
      <label htmlFor='forename'>Name: </label>
      <input data-testid="forename" type="text" autoComplete='off' name="forename" value={formData.forename}  onKeyDown={handleKeyDown}   onChange={handleInputChange}   />
       <span className={style.spanMessage} data-testid="forenameMessage">{formData.forenameMessage}</span>
      </p>
       
  
      <p>
      <label htmlFor='lastname'>Lastname:</label>
       
        <input data-testid="lastname" type="text" name="lastname" value={formData.lastname}   onKeyDown={handleKeyDown}
          onChange={handleInputChange}   />
        <span className={style.spanMessage}  data-testid="lastnameMessage">{formData.lastnameMessage}</span>
      </p>
        <p> 

      <label htmlFor='nationality'>Nationality:</label>
        
        <input data-testid="nationality" type="text" name="nationality" value={formData.nationality}   onKeyDown={handleKeyDown}
          onChange={handleInputChange}  />
        <span className={style.spanMessage}  data-testid="nationalityMessage">{formData.nationalityMessage}</span>
        </p>
     
     <p> 

        <label htmlFor='image'>Image:</label>
        <input  type="text" name="image" value={formData.image}   onKeyDown={handleKeyDown}
          onChange={handleInputChange}  />
        
     </p>
      <p> 

      <label htmlFor='dob'>Date of birth:</label>
       
        <input data-testid="dob" type="date" name="dob" value={formData.dob}   onKeyDown={handleKeyDown}
          onChange={handleInputChange}   />
        <span className={style.spanMessage}  data-testid="dobMessage">{formData.dobMessage}</span>
      </p>
  <p> 

      <label htmlFor='description'>Description:</label>
       
        <textarea data-testid="description" name="description" value={formData.description}  onKeyDown={handleKeyDown}
          onChange={handleInputChange}   />
        <span className={style.spanMessage}  data-testid="descriptionMessage">{formData.descriptionMessage}</span>
  </p>
       
<p> 
      <label htmlFor='teams'>Teams: <span data-testid="teamsMessage">{formData.teams?.length && formData.teamsMessage}</span>  </label>   
      <br />
      {formData.teams?.map((team, index) => (
          <span  
            key={index}
            className={style.selectedTeams}
            style={{ backgroundColor: assignColorToTeam(team) }}
          >
            {team}
          </span>
        ))}
        
        
        <select multiple name="teams" value={formData.teams}   
          onChange={handleEscuderiaChange}       >
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
      <button  className={style.buttonCancel}   type="button">{formData.status==='Saved' ? 'Home' : 'Cancel'}</button>
     </Link>
        <button data-testid="save"  className={style.button} disabled={formData.disabledSaveButtonTrueFalse} onClick={handleCreateDriver} type="button">{formData.status!=='Saved' ? 'Save': formData.status}</button>
    </div>
    </form>
  );
};

export default newDriver;
