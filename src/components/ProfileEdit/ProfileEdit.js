import './ProfileEdit.css'

function ProfileEdit(props) {
    

    const button = props.isFormActive ? <button type="submit" className="profile-edit__submit">Сохранить</button> : <button className="profile-edit__edit-button">Редактировать</button>;
    const isDesabled = props.isFormActive ? false : true;

    return (
        <section className="profile-edit">
            <div className="profile-edit__container container">
                <form className="profile-edit__form">
                    <div className="profile-edit__inputs-container">
                    <fieldset className="profile-edit__fieldset">
                        <label className="profile-edit__input-label" htmlFor="name">Имя</label>
                        <input disabled = {isDesabled} id="name" name="name" className="profile-edit__input" placeholder="Somebody"></input>
                    </fieldset>
                    <fieldset className="profile-edit__fieldset">
                        <label className="profile-edit__input-label" htmlFor="email">E-mail</label>
                        <input disabled = {isDesabled} id="email" name="email" className="profile-edit__input" placeholder="something@example.ru"></input>
                    </fieldset>
                    </div>
                    <span className="profile-edit__error-message">При обновлении профиля произошла ошибка</span>
                    {button}
                </form>
            </div>
        </section>
    )
}

export default ProfileEdit;