import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList(props) {
    const cardElements = props.cards.map( card => (
        <MoviesCard card={card} id={card.movieId}></MoviesCard>
    ))

    return (
        <section className="movies">
            <div className="movies__container container">
                {cardElements}
            </div>
        </section>
    )
}

export default MoviesCardList;