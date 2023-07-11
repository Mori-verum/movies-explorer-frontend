import './MoviesCard.css'

function MoviesCard(props) {
    // let { pathname } = useLocation();

    // function handleClickButton() {
    //     if (pathname === paths.movies) {
    //         if (props.card.liked) {
    //             props.handleDeleteMovie(props.savedMovies.find(savedMovie => savedMovie.movieId === props.card.id));
    //         } else {
    //             props.handleSaveMovie(props.card);
    //         }
    //     } else {
    //         props.handleDeleteMovie(props.card);
    //     }
    // }

    // const buttonClassName = `card__button button card__button_${pathname === paths.savedMovies ? "act_drop" : props.card.liked ? "enabled" : "act_save"}`;

    return (
        <article className="card">
            <p className="card__name">{ props.name}</p>
            <p className="card__duration">{props.duration} минут</p>
            <a
            className="card__link link"
            href={props.trailer}
            target="_blank"
            rel="noreferrer">
                <img
                className="card__img"
                alt={ props.name }
                src={props.image} />
            </a>
            {props.children}
        </article>
    )
}

export default MoviesCard;