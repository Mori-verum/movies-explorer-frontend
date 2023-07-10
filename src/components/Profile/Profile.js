import "./Profile.css"
import ProfileEdit from "../ProfileEdit/ProfileEdit";
import ProfileGreeting from "../ProfileGreeting/ProfileGreeting";
import ProfileLogout from "../ProfileLogout/ProfileLogout";

function Profile(props) {
    const isFormActive = false;

    return (
        <main className="main">
            <div className="profile">
                <ProfileGreeting />
                <ProfileEdit profileData={props.profileData} isFormActive={isFormActive} />
                <ProfileLogout handleLogout={props.handleLogout} isFormActive={isFormActive} />
            </div>
        </main>
    )
}

export default Profile;