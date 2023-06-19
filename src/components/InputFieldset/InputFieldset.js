import './InputFieldset.css'

function InputFieldset(props) {
    return (
        <fieldset className="fieldset">
            <label className="fieldset__input-label" htmlFor={ props.name }>{ props.label }</label>
            <input id={ props.name } name={ props.name } className="fieldset__input"></input>
            <span className="fieldset__validation-message"></span>
        </fieldset>
    )
}

export default InputFieldset;