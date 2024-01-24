

const validateForm =  (formData) => {
    
    let errorMessage={};
 

     
  
    if (/[^a-zA-Z\s]/.test(formData.forename)) {
     // setFormData((prevData) => ({ ...prevData, forenameMessage: 'The name cannot contain symbols.' }));
     errorMessage={...errorMessage,forename:'The name cannot contain symbols.'}
     return errorMessage
    }
  
    if (/[^a-zA-Z\s]/.test(formData.lastname)) {
        
        errorMessage={...errorMessage,lastname:'The lastname cannot contain symbols.'}
      //setFormData((prevData) => ({ ...prevData, lastnameMessage: 'The lastname cannot contain symbols.' }));
      console.log('lastName:',formData.lastname);
      return errorMessage;
    }
  
    if (formData.forename === '') {
        errorMessage ={ ...errorMessage, forename:'Name is empty, please write a valid name!'}
     // setFormData((prevData) => ({ ...prevData, forenameMessage: 'Name is empty, please write a valid name!' }));
      return errorMessage;
    }
  
    if (formData.lastname === '') {
        errorMessage ={ ...errorMessage, lastname:'Lastname is empty, please write a valid lastname!'}
    //   setFormData((prevData) => ({ ...prevData, lastnameMessage: 'Lastname is empty, please write a valid lastname!' }));
      return errorMessage;
    }
  
    if (formData.nationality === '') {
        errorMessage ={ ...errorMessage, nationality:'Nationality is empty, please write a valid nationality!'}

    //   setFormData((prevData) => ({ ...prevData, nationalityMessage: 'Nationality is empty, please write a valid nationality!' }));
      return errorMessage;
    }
  
    if (formData.dob === '') {
        errorMessage ={ ...errorMessage, dob:'Date of birth is empty, please write a valid date!'}

    //   setFormData((prevData) => ({ ...prevData, dobMessage: 'Date of birth is empty, please select a valid date!' }));
       return errorMessage;
    }
  
    const regex = /^(?:(?:19|20)\d\d|21[0-9]{2})[-/](0[1-9]|1[0-2])[-/](0[1-9]|[12][0-9]|3[01])$|^([0-2][0-9]|3[01])[-/](0[1-9]|1[0-2])[-/](?:19|20)\d\d$/;
  
    if (!regex.test(formData.dob)) {
        errorMessage ={ ...errorMessage, dob:'Invalid date format. Use YYYY/MM/DD, DD/MM/YYYY, MM/DD/YYYY o YYYY-MM-DD'}

    //   setFormData((prevData) => ({ ...prevData, dobMessage: 'Invalid date format. Use YYYY/MM/DD, DD/MM/YYYY, MM/DD/YYYY o YYYY-MM-DD' }));
      return errorMessage;
    }
  
    if (formData.description === '') {
        errorMessage ={ ...errorMessage, description:'Description is empty, please write a valid description!'}

    //   setFormData((prevData) => ({ ...prevData, descriptionMessage: 'Description is empty, please write a valid description!' }));
       return errorMessage;
    }

    
  
    if (formData.teams.length === 0) {
        errorMessage ={ ...errorMessage, teams:'Teams is empty, please select at least one team!' }
        
    //   setFormData((prevData) => ({ ...prevData, teamsMessage: 'Teams is empty, please select at least one team!' }));
       return errorMessage;
    }
  
    
    return errorMessage;
  };

 export default validateForm;