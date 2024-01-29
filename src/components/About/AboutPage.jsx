import style from './AboutPage.module.scss';
import { Link } from 'react-router-dom';
 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faLinkedin, faGithub, faWsh } from '@fortawesome/free-brands-svg-icons';


 
const AboutPage = () =>{
    return (
        <div className={style.content} data-testid="AboutPage">
          <div   alt="Edson" className={style.imageContent}  >
              <div className={style.edsonphoto}></div>
          </div>

        <h1 className={style.h1}>Edson Sanchez</h1>
        <div className={style.info}>
  <p className={style.infLink}>
  <FontAwesomeIcon icon={faLinkedin}/> 
    <Link to="https://linkedin.com/in/edsonnaza"> linkedin.com/in/edsonnaz</Link>
  </p>
  <p className={style.infLink}>
  <FontAwesomeIcon icon={faGithub}/> 
     <Link to="https://github.com/edsonnaza"> github.com/edsonnaza</Link>
  </p>
  <p className={style.infLink}>
  <FontAwesomeIcon icon={faWsh}/> 
    <Link to="https://wakatime.com/@edsonnaza"> wakatime.com/@edsonnaza</Link>
  </p>
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
            width="50%"
            height="600"
          />
        </div>
      );
    
}

export default AboutPage;