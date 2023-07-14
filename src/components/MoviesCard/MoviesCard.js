import './MoviesCard.css'

function MoviesCard(props) {
    return (
        <article className="card">
            <p className="card__name">{props.name}</p>
            <p className="card__duration">{props.duration} минут</p>
            <a
                className="card__link link"
                href={props.trailer}
                target="_blank"
                rel="noreferrer">
                <img
                    className="card__img"
                    alt={props.name}
                    src={props.image} />
            </a>
            {props.children}
        </article>
    )
}

export default MoviesCard;