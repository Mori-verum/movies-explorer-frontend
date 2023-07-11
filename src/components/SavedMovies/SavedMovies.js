import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { paths} from '../../utils/config';

import Search from '../Search/Search';

import { mainApi } from '../../utils/Api/MainApi';
import filterMovies from '../../utils/functions/filterMovies';
import filterShortMovies from '../../utils/functions/filterShortMovies';
import MoviesTableTooltip from '../MoviesTableTooltip/MoviesTableTooltip';
import Preloader from '../Preloader/Preloader';
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList';

function SavedMovies(props) {
    const [areMoviesLoading, setAreMoviesLoading] = useState(false); //для отображения прелоадера
    // const [wereMoviesUploaded, setWereMoviesUploaded] = useState(false);
    // const [filteredMovies, setFilteredMovies] = useState(
    //     JSON.parse(localStorage.getItem('filtered-movies')) || []
    // );
    const [savedMovies, setSavedMovies] = useState(
        JSON.parse(localStorage.getItem('saved-movies')) || []
    );
    const [tooltip, setTooltip] = useState({
        isVisible: false,
        message: ""
    });

    const { pathname } = useLocation();

    useEffect(() => {
        if (!savedMovies.length) {
            setAreMoviesLoading(true);
        }
        mainApi.getSavedMovies()
            .then(res => {
                setSavedMovies(res);
                if (!savedMovies.length) {
                    setTooltip({ isVisible: true, message: "Сохранённых фильмов нет" });
                }
            })
            .catch(err => {
                if (pathname === paths.savedMovies) {
                    console.log(err);
                    setTooltip({
                        isVisible: true,
                        message: "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз" });
                }
            })
            .finally(() => {
                setAreMoviesLoading(false);
            })
    }, [])

    useEffect(() => {
        localStorage.setItem('saved-movies', JSON.stringify(savedMovies));
    }, [savedMovies]);


    function getfilteredSavedCards(keyWord, isShortMovies) {
        // setSearchSavedMoviesData({ inputValue: keyWord, isShortMovies: isShortMovies ?? false });
    }

    function handleDeleteMovie(movieId) {
        mainApi.deleteMovie(movieId)
        .then(() => {
            setSavedMovies((state) => state.filter((c) => c._id !== movieId))
        })
        .catch(err => console.log(err))
    }

return (
    <main className="main">
         <Search getCards={getfilteredSavedCards} />
         <SavedMoviesCardList
         handleDeleteMovie={handleDeleteMovie}
         movies={savedMovies}
         />
         {tooltip.isVisible ? <MoviesTableTooltip text={tooltip.message} /> : null}
         {areMoviesLoading ? <Preloader /> : null}
      </main>
)
}

export default SavedMovies;