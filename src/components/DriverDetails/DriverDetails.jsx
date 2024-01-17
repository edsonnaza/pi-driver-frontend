import { useParams, Link } from 'react-router-dom';
import {useState,useEffect} from 'react'
//import getDriverById from '../../utils/getDriverById';
 
import classes from './DriverDetails.module.scss';
import { useDispatch, useSelector } from 'react-redux';

import  {actionGetDriverDetailById}  from '../../redux/actions';
 
const DriverDetails = () =>{
   //const [driverDetail, setDriverDetail] = useState([]);
   const {id} = useParams();
   //const logo_url =  `https://media.api-sports.io/formula-1/teams/${idDriver}.png`
   
   console.log('idDriver:',id);
   const dispatch= useDispatch();
 
   const driverDetail = useSelector((state) => state.driverDetail[0]);
   
  useEffect(() => {
    // Cargar los detalles del conductor al montar el componente
    dispatch(actionGetDriverDetailById(id));
    
  }, [dispatch, id]);

   
   

   

 
 
    return ( 
    
      <div className={classes.wrap}>
      <div className={classes.box}>
        <div className={classes["box-top"]}>
          {driverDetail && (
            <>
              <img className={classes["box-image"]} src={driverDetail.image_url} alt={driverDetail.forename} />
              <div className={classes["content"]}>
                <h3 className={classes["box-title"]}>{driverDetail.forename + ' ' + driverDetail.lastname}</h3>
                <p className={classes["text-info"]}><strong>Nationality:</strong> {driverDetail.nationality}</p>
                <p className={classes["text-info"]}><strong>Date of Birth:</strong> {driverDetail.dob}</p>
                <p className={classes["text-info"]}>
                  <strong>Teams:</strong> {driverDetail.teams ? driverDetail.teams.join(', ') + '.' : 'No teams available.'}
                </p>
              </div>
            </>
          )}
        </div>
  
        <p className={classes.descriptionTitle}><strong>Description</strong></p>
        <p className={classes.description}>{driverDetail && driverDetail.description}</p>
       <Link to="/home"><a  className={classes.button}>Follow {driverDetail && driverDetail.forename}</a></Link>
      
       </div>
    </div>
    )
}

export default DriverDetails;