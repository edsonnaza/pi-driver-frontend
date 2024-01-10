import {Link} from 'react-router-dom';
import SearchBar from '../SearchBar/SearchBar';
import Logo from '../../assets/f1_logo.svg';
import style from './NavBar.module.scss';

const NavBar = (props) =>{

    return (
        <nav className={style.navbar}>
            <div className={style.logoContainer}>
                <img src={Logo} alt='F1 Logo' className={style.logo}/>
            </div>
            <div className={style.searchInputContainer}>
                <SearchBar onSearch={props.onSearch}/>
            </div>
            <div className={style.linkContainer}>
                <Link to='/home' className={style['nav-link']}>
                    <span>Home</span>
                </Link>
                <Link to='/driver' className={style['nav-link']}>
                    Create
                </Link>
                <Link to='/about' className={style['nav-link']}>
                    About
                </Link>
               
            </div>
                <div className={style.logoutContainer}>
                <Link to="/" >
                <button className={style.logoutButton}>
                    Logout
                </button>
                </Link>
                </div>
        </nav>
    )
}

export default NavBar;