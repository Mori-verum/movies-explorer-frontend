import { useLocation } from 'react-router-dom';
import './MoviesCard.css'
import { paths } from '../../utils/config'

function MoviesCard(props) {
    let { pathname } = useLocation();

    function handleClickButton() {
        if (pathname === paths.movies) {
            if (props.card.liked) {
                props.handleDeleteMovie(props.savedMovies.find(savedMovie => savedMovie.movieId === props.card.id));
            } else {
                props.handleSaveMovie(props.card);
            }
        } else {
            props.handleDeleteMovie(props.card);
        }
    }

    const buttonClassName = `card__button button card__button_${pathname === paths.savedMovies ? "act_drop" : props.card.liked ? "enabled" : "act_save"}`;

    return (
        <article className="card">
            <p className="card__name">{ props.card?.nameRU ?? props.card.nameEn }</p>
            <p className="card__duration">{props.card.duration} минут</p>
            <a
            className="card__link link"
            href={pathname === paths.movies ? props.card.trailerLink : props.card.trailer}
            target="_blank"
            rel="noreferrer">
                <img
                className="card__img"
                alt={ props.card?.nameRU ?? props.card.nameEn }
                src={`${pathname === paths.movies ? "https://api.nomoreparties.co"+ props.card.image.url : props.card.image}`} />
            </a>
            <button onClick={handleClickButton} className={buttonClassName}></button>
        </article>
    )
}

export default MoviesCard;