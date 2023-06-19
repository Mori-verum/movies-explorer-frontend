import { Link } from 'react-router-dom';
import './Navigation.css';

function Navigation( props ) {
    const links =
    props.loggedIn ?
    (
        <>
        <Link className="navigation__link navigation__link_path_movies link" to="/movies">Фильмы</Link>
        <Link className="navigation__link navigation__link_path_saved-movies link" to="/saved-movies">Сохранённые фильмы</Link>
        <Link className='navigation__link navigation__link_path_profile link' to="/profile"></Link>
        </>
    ) : (
        <>
        <Link className="navigation__link navigation__link_path_signup link" to="/signup">Регистрация</Link>
        <Link className="navigation__link navigation__link_path_signin link" to="/signin">Войти</Link>
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