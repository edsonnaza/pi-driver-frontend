import { useParams, Link } from 'react-router-dom';
import classes from './DriverDetails.module.scss';

const DriverDetails = () =>{
    const { id } = useParams();
  
    return (<div>
        <h1>Driver Detail {id}</h1>
        <Link to="/home">
          <button className={classes.button} type="button">
            Home
          </button>
        </Link>
    </div>)
}

export default DriverDetails;