import './Header.css';
import headerLogo from '../../images/header_logo.svg'
import Navigation from '../Navigation/Navigation'

function Header(props) {
    const loggedIn = false;

    return (
        <header className="header">
            <img className="header__logo" src={headerLogo} alt="Логотип" />
            <Navigation loggedIn={loggedIn} />
        </header>
    )
}

export default Header;