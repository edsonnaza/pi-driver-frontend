import Card from '../Card/Card';
import classes from './Cards.module.scss';
//import Bienvenido from '../Layout/Bienvenido';

export default function Cards(props) {
   const data = props.drivers;
   
   console.log('cards',data);
       return(  <div className={classes.cardsContainer} >
           
          {/* { 
            !data.length && <Bienvenido />} */}
          { 
            
            data.map( (item)=>(
           
                <Card 
                key={item.id}
                name={item.forename +' '+ item.lastname}
                teams={item.teams}
                image={item.image_url}
                id={item.id}
                onClose={props.onClose}


                />
            ))

        }
            

         
     
   </div>);
}
