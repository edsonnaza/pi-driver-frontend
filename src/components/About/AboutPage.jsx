import style from './AboutPage.module.scss';
import { Link } from 'react-router-dom';
import edson from '../../assets/perfil-edson.jpeg';
const AboutPage = () =>{
    return (
        <div className={style.content}>
          <img
          className={style.edsonphoto}
          src={edson}
          alt="Eng. Edson Sanchez"
        />

        <h1 className={style.h1}>Edson Sanchez</h1>
        <div className={style.info}>
          <p><Link to="https://linkedin.com/in/edsonnaza">linkedin.com/in/edsonnaz</Link>a</p>
          <p><Link to="https://github.com/edsonnaza">github.com/edsonnaza</Link>a</p>
          <p><Link to="https://wakatime.com/@edsonnaza">wakatime.com/@edsonnaza</Link>a</p>
        
        </div>
          <p className={style.p}>
            Soy un entusiasta de la programación y disfruto compartiendo conocimientos con la comunidad.
          </p>
          <p className={style.p}>
            Aquí puedes ver mi perfil en mi <Link to="https://edsonnaza.netlify.app"><strong>portafolio.</strong></Link> 
          </p>
          <iframe className={style.iframe}
            title="Portafolio Profile"
            src="https://edsonnaza.netlify.app"
            width="30%"
            height="600"
          />
        </div>
      );
    
}

export default AboutPage;