import './ProfileEdit.css'
import React, { useContext, useEffect, useState } from "react";
import currentUserContext from '../../contexts/currentUserContext';

function ProfileEdit(props) {
    const currentUser = useContext(currentUserContext);
    const [userName, setUserName] = useState("");
    const [userEmail, setUserEmail] = useState("");

    const submitButtonClassName = `button profile-edit__submit${props.isFormActive ? "" : "_disabled"}`

    useEffect(() => {
        setUserName(currentUser.name);
        setUserEmail(currentUser.email);
    }, [currentUser])

    function handleChangeUserName(evt) {
        setUserName(evt.target.value);
    }

    function handleChangeUserEmail(evt) {
        setUserEmail(evt.target.value);
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        if(props.isFormActive) {
            props.handleEditProfile({
                name: userName,
                email: userEmail
            });
        } else {
            props.setIsProfileEditing(!props.isFormActive);
        }
        
    }

    return (
        <section className="profile-edit">
            <div className="profile-edit__container container">
                <form onSubmit={handleSubmit} className="profile-edit__form">
                    <div className="profile-edit__inputs-container">
                        <fieldset className="profile-edit__fieldset">
                            <label className="profile-edit__input-label" htmlFor="name">Имя</label>
                            <input onChange={handleChangeUserName} value={userName} disabled={!props.isFormActive} id="name" name="name" className="profile-edit__input" placeholder="Somebody"></input>
                        </fieldset>
                        <fieldset className="profile-edit__fieldset">
                            <label className="profile-edit__input-label" htmlFor="email">E-mail</label>
                            <input onChange={handleChangeUserEmail} value={userEmail} disabled={!props.isFormActive} id="email" name="email" className="profile-edit__input" placeholder="something@example.ru"></input>
                        </fieldset>
                    </div>
                    <span className="profile-edit__error-message">При обновлении профиля произошла ошибка</span>
                    <button onClick={handleSubmit} type="submit" className={submitButtonClassName}></button>
                </form>
            </div>
        </section>
    )
}

export default ProfileEdit;