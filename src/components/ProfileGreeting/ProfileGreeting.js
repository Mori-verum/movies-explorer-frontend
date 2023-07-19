import './ProfileGreeting.css';
import { useContext } from "react";
import currentUserContext from '../../contexts/currentUserContext';

function ProfileGreeting() {
    const currentUser = useContext(currentUserContext);

    return (
        <section className="profile-greeting">
            <div className="profile-greeting__container container">
                <h2 className="profile-greeting__title">Привет, {currentUser.name}</h2>
            </div>
        </section>
    )
}

export default ProfileGreeting;