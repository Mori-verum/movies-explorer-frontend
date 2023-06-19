import { Link } from 'react-router-dom';
import headerLogo from '../../images/header_logo.svg';
import './Logo.css';

function Logo() {
    return (
        <Link className="logo link" to="/">
            <img className="logo__img" src={headerLogo} alt="Логотип" />
        </Link>
    )
}

export default Logo;