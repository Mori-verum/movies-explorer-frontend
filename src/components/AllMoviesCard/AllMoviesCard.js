import MoviesCard from '../MoviesCard/MoviesCard';

function AllMoviesCard(props) {

    const buttonClassName = `card__button button card__button_${props.isLiked ? "enabled" : "act_save"}`;

    function handleClickButton() {
            if (props.isLiked) {
                props.handleDeleteMovie(props.savedMovies.find(savedMovie => savedMovie.movieId === props.card.id)._id);
            } else {
                props.handleSaveMovie(props.card)
            }
    }


    return (
        <MoviesCard
        name = {props.card?.nameRU ?? props.card.nameEn }
        duration = {props.card.duration}
        trailer = {props.card.trailerLink}
        image = {"https://api.nomoreparties.co"+ props.card.image.url}
        >
            <button onClick={handleClickButton} className={buttonClassName}></button>
        </MoviesCard>
    )
}

export default AllMoviesCard;