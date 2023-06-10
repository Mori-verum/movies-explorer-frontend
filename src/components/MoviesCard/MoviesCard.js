import { useLocation } from 'react-router-dom';
import './MoviesCard.css'

function MoviesCard(props) {
    let { pathname } = useLocation();
    const isLiked = false;

    const button = pathname === '/saved-movies' ? <button className="card__button button card__button_act_drop"></button> : <button className={isLiked ? "card__button button card__button_enabled" : "card__button button card__button_act_save"}></button>;

    return (
        <article className="card">
            <p className="card__name">{props.card.nameRU}</p>
            <p className="card__duration">{props.card.duration} минут</p>
            <a className="card__link link" href={props.card.trailerLink} target="_blank" rel="noreferrer">
                <img className="card__img" alt={props.card.nameRu} src={props.card.image} />
            </a>
            {button}
        </article>
    )
}

export default MoviesCard;