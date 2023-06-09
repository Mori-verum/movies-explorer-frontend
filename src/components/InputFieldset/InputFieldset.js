import './InputFieldset.css'

function InputFieldset(props) {
    return (
        <fieldset className="fieldset">
            <label className="fieldset__input-label" htmlFor={props.name}>{props.label}</label>
            <input
                required={props.required}
                pattern={props.pattern ?? null}
                type={props.type ?? ''}
                placeholder={props.placeholder}
                id={props.id}
                name={props.name}
                className="fieldset__input"
            />
            <span className="fieldset__validation-message">{props.validationMessage}</span>
        </fieldset>
    )
}

export default InputFieldset;