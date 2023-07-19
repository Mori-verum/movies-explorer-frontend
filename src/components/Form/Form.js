import './Form.css'

function Form(props) {

    function onSubmit(evt) {
        evt.preventDefault();
        props.handleSubmit();
    }

    return (
        <form onSubmit={onSubmit} noValidate className="form">
            <div className="form__inputs-container">
                {props.children}
            </div>
            <span className="form__server-error-message">{props.serverErrorMessage}</span>
            <button disabled={props.isSubmitDisabled} type="submit" className="form__submit button">{props.formSubmitText}</button>
        </form>
    )
}

export default Form;