import './Burger.css'

function Burger(props) {
    return (
        <div className="burger button" onClick={props.onClick}>
            <span className="burger__line"></span>
            <span className="burger__line"></span>
            <span className="burger__line"></span>
        </div>
    )
}

export default Burger;