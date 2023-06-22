import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreMovies from '../MoreMovies/MoreMovies';

function MoviesTable(props) {
    return (
        <main className="main">
            <Search />
            <MoviesCardList cards = { props.cards } />
            <MoreMovies />
        </main>
    )
}

export default MoviesTable;