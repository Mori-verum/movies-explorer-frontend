import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreMovies from '../MoreMovies/MoreMovies';

import cards from '../../utils/cards';

function Movies() {
    return (
        <main className="main">
            <Search />
            <MoviesCardList cards = { cards } />
            <MoreMovies />
        </main>
    )
}

export default Movies;