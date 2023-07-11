import MoviesCardList from '../MoviesCardList/MoviesCardList';
import SavedMoviesCard from '../SavedMoviesCard/SavedMoviesCard';

function SavedMoviesCardList(props) {

    const movies = props.movies.map(movie => (
            <SavedMoviesCard handleDeleteMovie={props.handleDeleteMovie} handleSaveMovie={props.handleSaveMovie} card={movie} ></SavedMoviesCard>
        ));

        return (
            <MoviesCardList>
                {movies}
            </MoviesCardList>
            )
}

export default SavedMoviesCardList;