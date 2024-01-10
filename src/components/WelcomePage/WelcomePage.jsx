import style from './WelcomePage.module.scss'
 
import {Link} from 'react-router-dom';

const WelcomePage = ()=>{

    return (
    <div className={style['welcome-page']} >
      
 <h1 className={style.titleWelcome}>Welcome to formula one world</h1>
     

<div className={style.buttonContainer}>
  <Link to="/home">
    
  <button className={style["mybutton"]} type ="button">
    <div className={style["mybuttoninner"]}>
        <div className={style["mybuttoninner2"]}>
            <ul>
                <li className={style.li}>Engine</li>
                <div className={style["mybuttoninnerline2"]}>
                    <div className={style["mybuttoninnerline"]}></div>
                </div>
                <li>Start</li>
            </ul>
        </div>
    </div>
</button> 
 </Link>
   



 
</div>
    </div>
    )
}

export default WelcomePage;