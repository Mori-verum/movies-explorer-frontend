import './MoreMoviesButton.css'

function MoreMoviesButton(props) {
    return (
        <button onClick={ props.onClick } className={props.hidden ? "more-movies-button_hidden" : "more-movies-button button"}>Ещё</button>
    )
}

export default MoreMoviesButton;