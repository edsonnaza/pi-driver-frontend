import {Link} from 'react-router-dom';
import Logo from '../../assets/F1.svg';
import style from './NavBar.module.scss';

const NavBar = () =>{

    return (
        <nav className={style.navbar}>
            <div className={style['navbar-left']}>
                <img src={Logo} alt='F1 Logo' className={style.logo}/>


            </div>
            <div className={style['navbar-right']}>
                <Link to='/' className={style['nav-link']}>
                    Home
                </Link>
                <Link to='/about' className={style['nav-link']}>
                    About
                </Link>
                <button className={style['logout-button']}>
                    Logout
                </button>
            </div>

        </nav>
    )
}

export default NavBar;