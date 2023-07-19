import { PATHS, WINDOW_SIZE_780 } from '../../utils/config';
import { NavLink } from 'react-router-dom';
import './Navigation.css';
import Burger from '../Burger/Burger'
import ModalMenu from '../ModalMenu/ModalMenu';
import { useState } from 'react';

function Navigation(props) {
    const [isMenuVisible, setIsMenuVisible] = useState(false);

    const headerForAuthUser = (
        <>
            {props.windowSize <= WINDOW_SIZE_780 && <Burger onClick={openModalMenu} />}
            {props.windowSize > WINDOW_SIZE_780 &&
                <>
                    <NavLink
                        className={({ isActive }) => isActive ?
                            "navigation__link navigation__link_active navigation__link_path_movies link" :
                            "navigation__link navigation__link_path_movies link"
                        }
                        to={PATHS.movies}
                    >Фильмы</NavLink>
                    <NavLink
                        className={({ isActive }) => isActive ?
                            "navigation__link navigation__link_active navigation__link_path_saved-movies link" :
                            "navigation__link navigation__link_path_saved-movies link"
                        }
                        to={PATHS.savedMovies}
                    >Сохранённые фильмы</NavLink>
                    <NavLink
                        className='navigation__link navigation__link_path_profile link'
                        to={PATHS.profile}
                    ></NavLink>
                </>
            }
        </>
    )

    const headerForUnauthUser = (
        <>
            <NavLink className="navigation__link navigation__link_path_signup link" to={PATHS.signUp}>Регистрация</NavLink>
            <NavLink className="navigation__link navigation__link_path_signin link" to={PATHS.signIn}>Войти</NavLink>
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
                <NavLink
                    to={PATHS.main}
                    className={({ isActive }) => isActive ?
                        "navigation__link navigation__link_active navigation__link_path_main link" :
                        "navigation__link navigation__link_path_main link"
                    }
                >Главная</NavLink>
                <NavLink
                    to={PATHS.movies}
                    className={({ isActive }) => isActive ?
                        "navigation__link navigation__link_active navigation__link_path_movies link" :
                        "navigation__link navigation__link_path_movies link"
                    }
                >Фильмы</NavLink>
                <NavLink
                    to={PATHS.savedMovies}
                    className={({ isActive }) => isActive ?
                        "navigation__link navigation__link_active navigation__link_path_saved-movies link" :
                        "navigation__link navigation__link_path_saved-movies link"
                    }
                >Сохранённые фильмы</NavLink>
                <NavLink
                    to={PATHS.profile}
                    className={({ isActive }) => isActive ?
                        "navigation__link navigation__link_active navigation__link_path_profile link" :
                        "navigation__link navigation__link_path_profile link"
                    }
                ></NavLink>
            </ModalMenu>
        </nav>
    )
};

export default Navigation;