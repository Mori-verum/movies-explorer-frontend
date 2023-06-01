import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation( props ) {
    const links =
    props.loggedIn ?
    (
        <>
        <Link className="navigation__link navigation__link_path_movies" to="/movies">Фильмы</Link>
        <Link className="navigation__link navigation__link_path_saved-movies" to="/saved-movies">Сохранённые фильмы</Link>
        </>
    ) : (
        <>
        <Link className="navigation__link navigation__link_path_signup" to="/signup">Регистрация</Link>
        <Link className="navigation__link navigation__link_path_signin" to="/signin">Войти</Link>
        </>
    );

    return (
        <nav className="navigation">
            <div className="navigation__container">
                {links}
            </div>
        </nav>
    )
};

export default Navigation;