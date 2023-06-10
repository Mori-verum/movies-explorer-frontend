import MoviesCardList from "../MoviesCardList/MoviesCardList";
import Search from "../Search/Search";

import cards from '../../utils/cards'
import MoreMovies from "../MoreMovies/MoreMovies";

function SavedMovies() {
    return (
        <main className="main">
            <Search />
            <MoviesCardList cards = { cards } />
            <MoreMovies />
        </main>
    )
}

export default SavedMovies;