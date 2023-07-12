import './ModalMenu.css'

function ModalMenu(props) {
    return (
    <div className={props.isMenuVisible ? "modal-menu modal-menu_opened" : "modal-menu"}>
        <div className="modal-menu__content">
        <button onClick={ props.onClose } aria-label="Закрыть модальное окно" type="button" className="modal-menu__close-button button"></button>
        {props.children}
        </div>
    </div>
    )
}

export default ModalMenu;