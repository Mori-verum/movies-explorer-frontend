import './Header.css';
import headerLogo from '../../images/header_logo.svg'
import Navigation from '../Navigation/Navigation'
import { useLocation } from 'react-router-dom';

function Header(props) {
    const loggedIn = true;
    let { pathname } = useLocation();

    return (
        <header className={ pathname !== "/" ? "header" : "header header_landing"}>
            <div className="header__container container">
                <img className="header__logo" src={headerLogo} alt="Логотип" />
                <Navigation loggedIn={loggedIn} />
            </div>
        </header>
    )
}

export default Header;