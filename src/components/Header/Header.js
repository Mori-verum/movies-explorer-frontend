import './Header.css';
import Navigation from '../Navigation/Navigation'
import { useLocation } from 'react-router-dom';
import Logo from '../Logo/Logo';

function Header(props) {
    let { pathname } = useLocation();

    return (
        <header className={ pathname !== "/" ? "header" : "header header_landing"}>
            <div className="header__container container">
                <Logo />
                <Navigation windowSize={ props.windowSize } loggedIn={ props.loggedIn } />
            </div>
        </header>
    )
}

export default Header;