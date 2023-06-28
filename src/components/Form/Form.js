import './Form.css'

function Form(props) {
    return (
                <form className="form">
                    <div className="form__inputs-container">
                        { props.children }
                    </div>
                    <span className="form__validation-message">Something was wrong</span>
                    <button type="submit" className="form__submit button">{ props.buttonText }</button>
                </form>
    )
}

export default Form;