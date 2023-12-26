import style from './WelcomePage.module.scss'
import F1svg from '../../assets/F1.svg'

const WelcomePage = ()=>{

    return (
    <div className={style['welcome-page']} >
      <h1>Welcome to Formula 1 World</h1>
   <img src=   {F1svg}/>
     

<div>
        <button className={style['enter-button']}>Start</button>
</div>
    </div>
    )
}

export default WelcomePage;