import { useLocation } from 'react-router-dom';
import './MoviesCard.css'
import { paths } from '../../utils/config'

function MoviesCard(props) {
    let { pathname } = useLocation();
    const isLiked = false;

    function handleSaveButton() {
        props.handleSaveMovie(props.card);
    }

    const button = pathname === paths.main ? <button className="card__button button card__button_act_drop"></button> : <button onClick={handleSaveButton} className={isLiked ? "card__button button card__button_enabled" : "card__button button card__button_act_save"}></button>;

    return (
        <article className="card">
            <p className="card__name">{ props.card?.nameRU ?? props.card.nameEn }</p>
            <p className="card__duration">{props.card.duration} минут</p>
            <a className="card__link link" href={props.card.trailerLink} target="_blank" rel="noreferrer">
                <img className="card__img" alt={ props.card?.nameRU ?? props.card.nameEn } src={'https://api.nomoreparties.co' + props.card.image.url} />
            </a>
            {button}
        </article>
    )
}

export default MoviesCard;