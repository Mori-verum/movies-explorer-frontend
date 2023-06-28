import "./Profile.css"

import ProfileEdit from "../ProfileEdit/ProfileEdit";
import ProfileGreeting from "../ProfileGreeting/ProfileGreeting";
import ProfileLogout from "../ProfileLogout/ProfileLogout";

function Profile() {
    const isFormActive = false;

    return (
        <main className="main">
            <div className="profile">
                <ProfileGreeting />
                <ProfileEdit isFormActive={isFormActive} />
                <ProfileLogout isFormActive={isFormActive} />
            </div>
        </main>
    )
}

export default Profile;