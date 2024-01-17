import classes from "./Card.module.scss";
import { Link } from "react-router-dom";
 
 
 
export default function Card(props) {
 
  const {id,name,image,teams,dob} = props;
 

  

  const closeHandler = (id) => {
    dispatch(removeFav(id));
    props.onClose(id);
  };
 

  
 
  

  
  return (
  
  <figure className="image-block">
   
	<h1>{name}</h1>

	<img src={image} alt={name} />

	<figcaption>
		<h3>
		{name}
		</h3>
    <p className={classes.dob}>Date of Birth: {dob}</p>
    <p className={classes.teamText}>Teams: {teams.map((team, index) => index === teams.length - 1 ? team + '.' : team + ', ')}</p>
	 <div className={classes.buttonContainer}>
   <Link style={{ textDecoration: 'none' }} to={`/details/${id}?${image}?${teams}`}>

    
   <p className={classes.buttonDetails}>

			More Info
   </p>
	 
    </Link>
   
      </div>
	</figcaption>
</figure>
  );
}
 