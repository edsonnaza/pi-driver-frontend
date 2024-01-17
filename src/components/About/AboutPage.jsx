import style from './AboutPage.module.scss';
const AboutPage = () =>{
    return (
        <div className={style.content}>
          <h1 className={style.h1}>About Me</h1>
          <p className={style.p}>
            Soy un entusiasta de la programación y disfruto compartiendo conocimientos con la comunidad.
          </p>
          <p className={style.p}>
            Aquí puedes ver mi perfil de tiempo de actividad en Wakatime:
          </p>
          <figure className={style.figure}><embed className={style.img} src="https://wakatime.com/share/@edsonnaza/e9a90bb4-3d52-4f07-8855-6b9df4faca76.svg"></embed></figure>
          <figure className={style.figure}><embed className={style.img} src="https://wakatime.com/share/@edsonnaza/1869de35-12f7-4953-af87-eb98e51fe701.svg"></embed></figure>
          <figure className={style.figure}><embed className={style.img} src="https://wakatime.com/share/@edsonnaza/2b4384cb-2894-4577-a35e-56fb203a6e4f.svg"></embed></figure>
        </div>
      );
    
}

export default AboutPage;