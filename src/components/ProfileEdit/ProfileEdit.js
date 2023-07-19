import './ProfileEdit.css'
import React, { useContext } from "react";
import currentUserContext from '../../contexts/currentUserContext';
import { useInputValidation } from "../../utils/hooks/use-input-validation";

function ProfileEdit(props) {
    const currentUser = useContext(currentUserContext);
    const name = useInputValidation('Имя', currentUser.name, { isEmpty: true, minLength: 2, });
    const email = useInputValidation('E-mail', currentUser.email, { isEmpty: true, isEmail: false, });

    const submitButtonClassName = `button profile-edit__submit${props.isFormActive ? "" : "_disabled"}`;
    const submitButtonText = props.isFormActive ? (props.isLoadingMessage ? props.loadingMessage : "Сохранить") : "Редактировать";

    function handleSubmit(evt) {
        evt.preventDefault();
        if (props.isFormActive) {
            props.handleEditProfile({ name: name.inputValue, email: email.inputValue });
        } else {
            props.setProfileEditingMessage({ isSuccessful: false, message: '' });
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
                            <input style={name.validationMessage ? { "color": "#ff004c" } : { "color": "var(--text-color)" }} onChange={name.handleInputChange} value={name.inputValue} disabled={!props.isFormActive} id="name" name="name" className="profile-edit__input" placeholder="Somebody"></input>
                        </fieldset>
                        <fieldset className="profile-edit__fieldset">
                            <label className="profile-edit__input-label" htmlFor="email">E-mail</label>
                            <input style={email.validationMessage ? { "color": "#ff004c" } : { "color": "var(--text-color)" }} onChange={email.handleInputChange} value={email.inputValue} disabled={!props.isFormActive} id="email" name="email" className="profile-edit__input" placeholder="something@example.ru"></input>
                        </fieldset>
                    </div>
                    <span style={props.isSuccessful ? { "color": "var(--accent-color)" } : { "color": "#ff004c" }} className="profile-edit__message">{name.validationMessage || email.validationMessage || props.profileEditingMessage}</span>
                    <button disabled={!email.isValid || !name.isValid || (props.isFormActive && email.inputValue === currentUser.email && name.inputValue === currentUser.name)} onClick={handleSubmit} type="submit" className={submitButtonClassName}>{submitButtonText}</button>
                </form>
            </div>
        </section>
    )
}

export default ProfileEdit;