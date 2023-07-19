import AllMoviesCard from '../AllMoviesCard/AllMoviesCard';
import MoviesCardList from '../MoviesCardList/MoviesCardList';


function AllMoviesCardList(props) {

    const movies = props.movies.map(movie => {
        const isLiked = props.savedMovies.some(savedMovie => savedMovie.movieId === movie.id);
        return (
            <AllMoviesCard isLiked={isLiked} savedMovies={props.savedMovies} handleDeleteMovie={props.handleDeleteMovie} handleSaveMovie={props.handleSaveMovie} card={movie} key={movie.id}></AllMoviesCard>
        )
    });

    return (
        <MoviesCardList>
            {movies}
        </MoviesCardList>
    )
}


export default AllMoviesCardList;