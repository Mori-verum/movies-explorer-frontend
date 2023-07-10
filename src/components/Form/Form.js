import './Form.css'

function Form(props) {
    return (
        <form onSubmit={props.onSubmit} className="form">
            <div className="form__inputs-container">
                {props.children}
            </div>
            <span className="form__validation-message">Something was wrong</span>
            <button type="submit" className="form__submit button">{props.formSubmitText}</button>
        </form>
    )
}

export default Form;