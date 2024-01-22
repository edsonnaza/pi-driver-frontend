import { Link } from "react-router-dom";
import style from "./PageNotFound.module.scss";
const PageNotFound =()=>{
    return (
      <>    <div className={style.container}>
        <h1>Page not found - 404</h1>
   
      <div className={style.buttonContainer}>
               <Link to="/home"><button className={style.button}>Go Home</button></Link>
         </div>
     
        </div>  
      </>

    )
}

export default PageNotFound;