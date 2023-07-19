import MoviesCard from '../MoviesCard/MoviesCard';

function SavedMoviesCard(props) {

    function handleClickButton() {
        props.handleDeleteMovie(props.card._id);
    }

    return (
        <MoviesCard
            name={props.card?.nameRU ?? props.card.nameEn}
            duration={props.card.duration}
            trailer={props.card.trailer}
            image={props.card.image}
        >
            <button onClick={handleClickButton} className="card__button button card__button_act_drop"></button>
        </MoviesCard>
    )
}

export default SavedMoviesCard;