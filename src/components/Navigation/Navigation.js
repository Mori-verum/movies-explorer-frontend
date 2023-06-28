import { paths } from '../../utils/config';
import { Link, useLocation } from 'react-router-dom';
import './Navigation.css';
import Burger from '../Burger/Burger'
import ModalMenu from '../ModalMenu/ModalMenu';
import { useState } from 'react';

function Navigation(props) {
    const [isMenuVisible, setIsMenuVisible] = useState(false);
    const { pathname } = useLocation();

    const headerForAuthUser = (
        <>
            {props.windowSize <= 780 && <Burger onClick={openModalMenu} />}
            {props.windowSize > 780 &&
                <>
                    <Link className="navigation__link navigation__link_path_movies link" to={paths.movies}>Фильмы</Link>
                    <Link className="navigation__link navigation__link_path_saved-movies link" to={paths.savedMovies}>Сохранённые фильмы</Link>
                    <Link className='navigation__link navigation__link_path_profile link' to={paths.profile}></Link>
                </>
            }
        </>
    )

    const headerForUnauthUser = (
        <>
            <Link className="navigation__link navigation__link_path_signup link" to={paths.signUp}>Регистрация</Link>
            <Link className="navigation__link navigation__link_path_signin link" to={paths.signIn}>Войти</Link>
        </>
    )

    const links = (
        props.loggedIn ? headerForAuthUser : headerForUnauthUser
    );

    function openModalMenu() {
        setIsMenuVisible(true);
    }

    function closeModalMenu() {
        setIsMenuVisible(false);
    }

    return (
        <nav className="navigation">
            <div className="navigation__container">
                {links}
            </div>
            <ModalMenu isMenuVisible={isMenuVisible} onClose={closeModalMenu}>
                <Link className={pathname === paths.main ?
                    "navigation__link navigation__link_active navigation__link_path_main link" :
                    "navigation__link navigation__link_path_main link"
                } to={paths.main}>Главная</Link>
                <Link className={pathname === paths.movies ?
                    "navigation__link navigation__link_active navigation__link_path_movies link" :
                    "navigation__link navigation__link_path_movies link"
                } to={paths.movies}>Фильмы</Link>
                <Link className={pathname === paths.savedMovies ?
                    "navigation__link navigation__link_active navigation__link_path_saved-movies link" :
                    "navigation__link navigation__link_path_saved-movies link"
                } to={paths.savedMovies}>Сохранённые фильмы</Link>
                <Link className={pathname === paths.profile ?
                    "navigation__link navigation__link_active navigation__link_path_profile link" :
                    "navigation__link navigation__link_path_profile link"
                } to={paths.profile}></Link>
            </ModalMenu>
        </nav>
    )
};

export default Navigation;