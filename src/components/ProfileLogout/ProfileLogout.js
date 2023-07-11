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
            <button type="button" onClick={handleLogout} className={`button profile-logout__button${!props.isFormActive ? "" : "_disabled"}`}>Выйти из аккаунта</button>
        </div>
    </section>
    )
}

export default ProfileLogout;