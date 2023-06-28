import './ProfileLogout.css';

function ProfileLogout(props) {
    
    return (
    <section className="profile-logout">
        <div className="profile-logout__container container">
            <button className={props.isFormActive ? "profile-logout__button_disabled" : "profile-logout__button"}>Выйти из аккаунта</button>
        </div>
    </section>
    )
}

export default ProfileLogout;