import { useState, useEffect } from "react";
import classes from './SearchBar.module.scss';
import Lupa from '../../assets/Lupa.ico';
import Download from '../../assets/download.ico';
 
export default function SearchBar(props) {
 
const [driverName, setDriverName] = useState('');
const [icoImage, setIcoImage] = useState(Lupa);
   
   //console.log(props);
 useEffect(()=>{
   const identifier = setTimeout(()=>{
      
  
   if(driverName.length>0){
      setIcoImage(Download);
   } else {
      setIcoImage(Lupa)
   }
      
   },500);

   return ()=>{
     // console.log('CLEANUP');
      clearTimeout(identifier);
   }
 },[driverName]);

 const handleChange = (ev)=>{
   console.log(ev.target.value);
   ev.preventDefault();
    
   const name = ev.target.value;
   setDriverName(name);
  
}

const handleKeyDown = (event) =>{
   console.log(event.key);
   if(event.key === "Enter"){
      const name=event.target.value;
      setDriverName(name);
       props.onSearch(driverName);
   }
}

   
   return (
      <div className={classes.searchBar}  >
         
         <input   onChange={handleChange} 
         value={driverName} 
         type='search' 
         onKeyDown={handleKeyDown}
         />

         <button className={classes.searchbutton} 
         onClick={()=>props.onSearch(driverName)}
        
         
         
         > <img className={classes.icono} src={icoImage} alt={"Search a Driver!"} /></button>
       
      
      </div>
   );
}
