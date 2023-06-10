import './SwitchButton.css'

function SwitchButton({ text }) {
    return (
        <label className="switcher">
            <input className="switcher__checkbox" type="checkbox" />
            <span className="switcher__slider"></span>
            <p className="switcher__text">{ text }</p>
        </label>
    )
}

export default SwitchButton;