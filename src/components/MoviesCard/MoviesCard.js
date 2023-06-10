import './MoviesCard.css'

function MoviesCard(props) {
    return (
        <article className="card">
            <p className="card__name">{props.card.nameRU}</p>
            <p className="card__duration">{props.card.duration} минут</p>
            <a className="card__link" href={props.card.trailerLink} target="_blank" rel="noreferrer">
                <img className="card__img" alt={props.card.nameRu} src={props.card.image} />
            </a>
            <button className="card__button">Сохранить</button>
        </article>
    )
}

export default MoviesCard;