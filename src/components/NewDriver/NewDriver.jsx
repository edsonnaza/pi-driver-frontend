import React, { useState, useEffect } from 'react';
import getTeams from '../../utils/getTeams';
import style from './NewDriver.module.scss';
import { useDispatch, useSelector } from 'react-redux';
import { actionCreateNewDriver } from '../../redux/actions';
import validateForm from '../../utils/validateForm';
import imageDefaultDriver from '../../../public/imageDefaultDriver.jpg';
import { getRandomColor } from '../../utils/asignColor'; 
 
const newDriver = () => {
  //Obtén el estado directamente en la función principal del componente
 //const buttonDisabled = useSelector((state) => state.buttonDisabled);
 const status = useSelector((state) => state.status);
 const buttonDisabled= useSelector((state)=>state.buttonDisabled);
  

  const [teamColors, setTeamColors] = useState({});
  const initialFormStatus = {
    buttonDisabled,
    status,
    saveButtonLocal:true
     
  };

  const initInputData = {
    forename:'',
    lastname:'',
    nationality:'',
    image:imageDefaultDriver,
    dob:'',
    description:'',
    teams:[]
  }

  const initErroMessage={
    forename:'',
    lastname:'',
    nationality:'',
    image:'',
    dob:'',
    description:'',
    teams:[]

  }
  const [inputForm, setInputForm] = useState(initInputData);
  const [errorMessage, setErrorMessage]=useState(initErroMessage);
  const [formStatus, setFormStatus] = useState(initialFormStatus);
  const [teamsOptions, setTeamsOptions] = useState([]);
  
  const handleInputChange = (e) => {
    e.preventDefault();
  
    // Obtén el nombre y el valor del elemento que cambió
    const { name, type } = e.target;
    let value;
  
    // Si es una selección múltiple, determina las opciones seleccionadas
    if (type === 'select-multiple') {
      const selectedOptions = Array.from(e.target.selectedOptions, (option) => option.value);
      const isOptionSelected = inputForm[name].includes(selectedOptions[0]);
  
      // Si la opción seleccionada ya estaba presente, quítala; de lo contrario, acumúlala
      value = isOptionSelected
        ? inputForm[name].filter(option => !selectedOptions.includes(option))
        : [...inputForm[name], ...selectedOptions];
    } else {
      value = e.target.value;
    }
  
    // Actualiza el estado común para ambos casos (input y selección)
    setInputForm((prevInputForm) => ({
      ...prevInputForm,
      [name]: value,
    }));
  
    // Validar el formulario y establecer el mensaje de error
    setErrorMessage((prevErrorMessage) => {
      const updatedErrorMessage = validateForm({ ...inputForm, [name]: value });
      
      // Verifica si no hay errores para activar el botón de guardar
      if (Object.values(updatedErrorMessage).length === 0) {
        console.log('antes de actualizar formStatus', formStatus.saveButtonLocal);
        setFormStatus((prevFormStatus) => ({ ...prevFormStatus, saveButtonLocal: false }));
      } else {
        setFormStatus((prevFormStatus) => ({ ...prevFormStatus, saveButtonLocal: true }));
      }
  
      return updatedErrorMessage;
    });
  };
  

  const dispatch = useDispatch();

  useEffect(() => {
    const fetchTeams = async () => {
      try {
        const teamsData = await getTeams();
      
        setTeamsOptions(teamsData.map(team => team));
      } catch (error) {
        // Manejar el error  
        console.error('Error getting the teams:', error);
      }
    };

    fetchTeams();
 
  }, []);


const assignColorToTeam = (team,setTeamColors) => {
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

 
const handleSendForm = async (e) => {
  e.preventDefault();

  if (Object.values(errorMessage).length === 0) {
    console.log(inputForm);
    console.log('Will save data...!');

    try {
      await dispatch(actionCreateNewDriver(inputForm ));
      console.log('Data saved successfully!');
    } catch (error) {
      console.error('Error sending the data form:', error.message);
       
    }
  } else {
    handleInputChange(e);
  }
};

 

  return (
    <form className={style.form} onSubmit={handleSendForm}  data-testid="NewDriverPage" >
     <div className={style.title}> Create New Driver</div>
 
      <hr />
      <p>
      <label htmlFor='forename'>Name: </label>
      <input   data-testid="forename" type="text" autoComplete='off' name="forename" value={inputForm.forename}      onChange={handleInputChange}   />
       <span className={style.spanMessage} data-testid="forenameMessage">{errorMessage && errorMessage.forename}</span>
      </p>
       
  
      <p>
      <label htmlFor='lastname'>Lastname:</label>
       
        <input data-testid="lastname" type="text" name="lastname" value={inputForm.lastname}    
          onChange={handleInputChange}   />
        <span className={style.spanMessage}  data-testid="lastnameMessage">{errorMessage && errorMessage.lastname}</span>
      </p>
        <p> 

      <label htmlFor='nationality'>Nationality:</label>
        
        <input data-testid="nationality" type="text" name="nationality" value={inputForm.nationality}   
          onChange={handleInputChange}  />
        <span className={style.spanMessage}  data-testid="nationalityMessage">{errorMessage && errorMessage.nationality}</span>
        </p>
     
     <p> 

        <label htmlFor='image'>Image:</label>
        <input data-testid="image" type="text" name="image" value={inputForm.image}    
          onChange={handleInputChange}  />
        
     </p>
      <p> 

      <label htmlFor='dob'>Date of birth:</label>
       
        <input data-testid="dob" type="date" name="dob" value={inputForm.dob}   
          onChange={handleInputChange}   />
        <span className={style.spanMessage}  data-testid="dobMessage">{errorMessage && errorMessage.dob}</span>
      </p>
  <p> 

      <label htmlFor='description'>Description:</label>
       
        <textarea data-testid="description" name="description" value={inputForm.description}   
          onChange={handleInputChange}   />
        <span className={style.spanMessage}  data-testid="descriptionMessage">{errorMessage && errorMessage.description}</span>
  </p>
       
<div> 
      <label  htmlFor='teams'>Teams: </label>   
      <span className={style.spanMessage} data-testid="teamsMessage">
          {errorMessage && errorMessage.teams} 
      </span>

        <div className={style.teamsSelectedContainer}>
          {Array.isArray(inputForm.teams) && inputForm.teams.map((team, index) => (
            <span  
            key={index}
            className={style.selectedTeams}
            style={{ backgroundColor: assignColorToTeam(team,setTeamColors) }}
            >
              {team}
            </span>  
            ))}
      </div>
        

    

        
        
<select data-testid="teamsSelectOption" multiple name="teams" value={inputForm.teams} onChange={handleInputChange}>
  {teamsOptions.map((team, index) => (
    <option key={index} value={team}>
      {team}
    </option>
  ))}
</select>
  </div>
         
   
    <p className={style.savedMessage}>{status==='Saved' && 'Driver saved successfully!'}</p>
   
      <div className={style.actions}>
     
      <a href='/home' className={style.buttonCancel}   type="button">{status==='Saved' ? 'Home' : 'Cancel'}</a>
    
        <button data-testid="save" disabled={status==='Saved'?true:formStatus.saveButtonLocal}   className={style.button}   type="submit">{formStatus.status!=='Saved' ? 'Save': formStatus.status}</button>
    </div>
    </form>
  );
};

export default newDriver;
