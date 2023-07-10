import './ProfileLogout.css';
import { useNavigate } from 'react-router-dom';
import { paths } from "../../utils/config";

function ProfileLogout(props) {
    const navigate = useNavigate();

    function handleLogout(evt) {
        evt.preventDefault();
        props.handleLogout();
        navigate(paths.signIn, { replace: true });
    }
    
    return (
    <section className="profile-logout">
        <div className="profile-logout__container container">
            <button type="button" onClick={handleLogout} className={props.isFormActive ? "profile-logout__button_disabled" : "profile-logout__button"}>Выйти из аккаунта</button>
        </div>
    </section>
    )
}

export default ProfileLogout;