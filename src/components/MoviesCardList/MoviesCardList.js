import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard'

function MoviesCardList(props) {

    const movies = props.movies.map(movie => (
            <MoviesCard savedMovies={props.savedMovies} handleDeleteMovie={props.handleDeleteMovie} handleSaveMovie={props.handleSaveMovie} card={movie} id={movie.movieId}></MoviesCard>
        ));

    return (
        <section className="movies">
            <div className="movies__container container">
                {movies}
            </div>
        </section>
    )
}

export default MoviesCardList;