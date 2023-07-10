import './SwitchButton.css'

function SwitchButton(props) {
    return (
        <label className="switcher">
            <input defaultChecked={props.isSwitchButtonActive} onClick={props.onClick} className="switcher__checkbox" type="checkbox" />
            <span className="switcher__slider"></span>
            <p className="switcher__text">{ props.text }</p>
        </label>
    )
}

export default SwitchButton;