import style from './WelcomePage.module.scss'
import F1svg from '../../assets/F1.svg'
import {Link} from 'react-router-dom';

const WelcomePage = ()=>{

    return (
    <div className={style['welcome-page']} >
      <h1>Welcome to Formula 1 World</h1>
   <img src=   {F1svg}/>
     

<div>
  <Link to="/home">
        <button className={style['enter-button']}>Start</button>
  </Link>
</div>
    </div>
    )
}

export default WelcomePage;