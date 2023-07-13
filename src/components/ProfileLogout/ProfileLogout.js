import './ProfileLogout.css';

function ProfileLogout(props) {

    function handleLogout(evt) {
        evt.preventDefault();
        props.handleLogout();
    }

    return (
        <section className="profile-logout">
            <div className="profile-logout__container container">
                <button type="button" onClick={handleLogout} className="button profile-logout__button" >Выйти из аккаунта</button>
            </div>
        </section>
    )
}

export default ProfileLogout;