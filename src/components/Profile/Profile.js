import ProfileEdit from "../ProfileEdit/ProfileEdit";
import ProfileGreeting from "../ProfileGreeting/ProfileGreeting";
import ProfileLogout from "../ProfileLogout/ProfileLogout";

function Profile() {
    const isFormActive = false;

    return (
        <main className="main">
            <ProfileGreeting />
            <ProfileEdit isFormActive={ isFormActive } />
            <ProfileLogout isFormActive={ isFormActive } />
        </main>
    )
}

export default Profile;