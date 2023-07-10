import './MoviesCardList.css';
import MoviesCard from '../MoviesCard/MoviesCard'
import { useLocation } from 'react-router-dom';
import { paths } from '../../utils/config';

function MoviesCardList(props) {
    const { pathname } = useLocation();

    let movies;

    if (pathname === paths.movies) {
        movies = props.movies.map(movie => (
            <MoviesCard handleSaveMovie={props.handleSaveMovie} card={movie} id={movie.movieId}></MoviesCard>
        ));
    } else if (pathname === paths.savedMovies) {
        movies = props.savedMovies.map(movie => (
            <MoviesCard card={movie} id={movie.movieId}></MoviesCard>
        ));
    }

    return (
        <section className="movies">
            <div className="movies__container container">
                {movies}
            </div>
        </section>
    )
}

export default MoviesCardList;