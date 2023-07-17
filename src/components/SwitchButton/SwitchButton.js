import './SwitchButton.css'

function SwitchButton(props) {
    return (
        <label className={props.isDisabled ? 'switcher switcher_disabled' : 'switcher'}>
            <input disabled={props.isDisabled} defaultChecked={props.isSwitchButtonActive} onClick={props.onClick} className={props.isSwitchButtonActive ? "switcher__checkbox switcher__checkbox_checked" : "switcher__checkbox"} type="checkbox" />
            <span className={
                props.isSwitchButtonActive ?
                    "switcher__slider switcher__slider_checked" :
                    "switcher__slider"
            }></span>
            <p className={props.isDisabled ? 'switcher__text switcher__text_disabled' : 'switcher__text'}>{props.text}</p>
        </label>
    )
}

export default SwitchButton;