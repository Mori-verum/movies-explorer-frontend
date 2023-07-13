import "./Profile.css"
import ProfileEdit from "../ProfileEdit/ProfileEdit";
import ProfileGreeting from "../ProfileGreeting/ProfileGreeting";
import ProfileLogout from "../ProfileLogout/ProfileLogout";

function Profile(props) {
    return (
        <main className="main">
            <div className="profile">
                <ProfileGreeting />
                <ProfileEdit setIsProfileEditing={props.setIsProfileEditing} handleEditProfile={props.handleEditProfile} profileData={props.profileData} isFormActive={props.isProfileEditing} />
                <ProfileLogout handleLogout={props.handleLogout} />
            </div>
        </main>
    )
}

export default Profile;