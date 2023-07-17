import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { PATHS } from '../../utils/config';

import Search from '../Search/Search';

import { mainApi } from '../../utils/Api/MainApi';
import filterMovies from '../../utils/functions/filterMovies';
import filterShortMovies from '../../utils/functions/filterShortMovies';
import MoviesTableTooltip from '../MoviesTableTooltip/MoviesTableTooltip';
import Preloader from '../Preloader/Preloader';
import SavedMoviesCardList from '../SavedMoviesCardList/SavedMoviesCardList';

function SavedMovies(props) {
    const [isSearchFormActive, setIsSearchFormActive] = useState(false);
    const [areMoviesLoading, setAreMoviesLoading] = useState(false); //для отображения прелоадера
    const [wereMoviesUploaded, setWereMoviesUploaded] = useState(false);
    const [filteredMovies, setFilteredMovies] = useState([]);
    const [movies, setSavedMovies] = useState(
        JSON.parse(localStorage.getItem('saved-movies')) || []
    );
    const [tooltip, setTooltip] = useState({
        isVisible: false,
        message: ""
    });

    const { pathname } = useLocation();

    useEffect(() => {
        if (!movies.length) {
            setAreMoviesLoading(true);
        }
        setIsSearchFormActive(false);
        mainApi.getSavedMovies()
            .then(res => {
                setSavedMovies(res);
                setFilteredMovies(res);
                if (!movies.length) {
                    setTooltip({ isVisible: true, message: "Сохранённых фильмов нет" });
                }
            })
            .catch(err => {
                if (pathname === PATHS.savedMovies) {
                    console.log(err);
                    setTooltip({
                        isVisible: true,
                        message: "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
                    });
                }
            })
            .finally(() => {
                setAreMoviesLoading(false);
                setIsSearchFormActive(true);
            })
    }, [])

    useEffect(() => {
        localStorage.setItem('saved-movies', JSON.stringify(movies));
    }, [movies]);

    useEffect(() => {
        if (wereMoviesUploaded && !filteredMovies.length) {
            setTooltip({ isVisible: true, message: "Ничего не найдено :(" });
        } else if (filteredMovies.length) {
            setTooltip({ isVisible: false, message: "" });
        }
    }, [movies, filteredMovies, wereMoviesUploaded])


    function getfilteredSavedCards(keyWord, isShortMovies) {
        if (isShortMovies) {
            setFilteredMovies(filterShortMovies(filterMovies(movies, keyWord)));
        } else {
            setFilteredMovies(filterMovies(movies, keyWord));
        }
        setWereMoviesUploaded(true);
    }

    function handleDeleteMovie(movieId) {
        mainApi.deleteMovie(movieId)
            .then((res) => {
                return movies.filter((c) => c._id !== movieId);
            })
            .then((movies) => {
                setSavedMovies(movies);
                setFilteredMovies((prevMovies) => {
                    const moviesForRendering = [];
                    for (const prevMovie of prevMovies) {
                        for (const movie of movies) {
                            if (movie._id === prevMovie._id) {
                                moviesForRendering.push(movie);
                            }
                        }
                    }
                    return moviesForRendering;
                });

                if (!movies.length) {
                    setTooltip({ isVisible: true, message: "Сохранённых фильмов нет" });
                }
            })
            .catch(err => console.log(err))
    }

    return (
        <main className="main">
            <Search
                getCards={getfilteredSavedCards}
                isSearchFormActive={isSearchFormActive}
            />
            <SavedMoviesCardList
                handleDeleteMovie={handleDeleteMovie}
                movies={filteredMovies}
            />
            {tooltip.isVisible ? <MoviesTableTooltip text={tooltip.message} /> : null}
            {areMoviesLoading ? <Preloader /> : null}
        </main>
    )
}

export default SavedMovies;