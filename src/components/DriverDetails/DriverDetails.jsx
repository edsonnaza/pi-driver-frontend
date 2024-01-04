import { useParams, Link } from 'react-router-dom';
import {useState,useEffect} from 'react'
import getDriverById from '../../utils/getDriverById';
 
import classes from './DriverDetails.module.scss';


const DriverDetails = () =>{
   const [driverDetail, setDriverDetail] = useState([]);
   const { id} = useParams();
   const logo_url =  `https://media.api-sports.io/formula-1/teams/${id}.png`
     
   useEffect(() => {
    const fetchDriverDetails = async () => {
      try {
        const data = await getDriverById(id,setDriverDetail);
          
       
      } catch (error) {
        console.error(error);
      }
    };

    fetchDriverDetails();
  }, [id]);

   

 
 
    return ( 
      <div className={classes.wrap}>
      <div className={classes.box}>
        <div className={classes["box-top"]}>
          <img className={classes["box-image"]} src={driverDetail.image_url} alt={driverDetail.forename} />
          <div className={classes["content"]}>
            <h3 className={classes["box-title"]}>{driverDetail.forename + ' ' + driverDetail.lastname}</h3>
            <p className={classes["text-info"]}> <strong>Nationality:</strong>  {driverDetail.nationality} </p>
            <p className={classes["text-info"]}> <strong>Date of Birth:</strong>  {driverDetail.dob}</p>
            <p className={classes["text-info"]}>
           <strong>Teams:</strong>  {driverDetail.teams ? driverDetail.teams.join(', ') + '.' : 'No teams available.'}
              </p>
          </div>
            
        </div>
         
       <p className={classes.descriptionTitle}>< strong>Description</strong> 
        </p>
        
        <p className={classes.description}> {driverDetail.description}</p>
        <a href="/home" className={classes.button}>Follow {driverDetail.forename}</a>
      </div>
    </div>
      
        
    
      
    )
}

export default DriverDetails;