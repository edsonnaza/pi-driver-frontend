import {Link} from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import Logo from '../../assets/f1_logo.svg';
import style from './NavBar.module.scss';

const NavBar = (props) =>{

    return (
        <nav className={style.navbar}>
            <div className={style['navbar-left']}>
                <img src={Logo} alt='F1 Logo' className={style.logo}/>


            </div>
            <div>
                <SearchBar onSearch={props.onSearch}/>
            </div>
            <div className={style['navbar-right']}>
                <Link to='/home' className={style['nav-link']}>
                    <span>Home</span>
                </Link>
                <Link to='/about' className={style['nav-link']}>
                    About
                </Link>
                <Link to="/" >
                <button className={style['logout-button']}>
                    Logout
                </button>
                </Link>
            </div>

        </nav>
    )
}

export default NavBar;