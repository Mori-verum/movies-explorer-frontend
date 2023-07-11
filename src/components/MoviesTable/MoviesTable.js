import { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { paths, moviesForRenderingAmount } from '../../utils/config';

import Search from '../Search/Search';
import MoviesCardList from '../MoviesCardList/MoviesCardList';
import MoreMovies from '../MoreMovies/MoreMovies';

import { moviesApi } from '../../utils/Api/MoviesApi';
import { mainApi } from '../../utils/Api/MainApi';
import filterMovies from '../../utils/functions/filterMovies';
import filterShortMovies from '../../utils/functions/filterShortMovies';
import MoviesTableTooltip from '../MoviesTableTooltip/MoviesTableTooltip';
import Preloader from '../Preloader/Preloader';

function MoviesTable(props) {
    const [areMoviesLoading, setAreMoviesLoading] = useState(false); //для отображения прелоадера
    const [wereMoviesUploaded, setWereMoviesUploaded] = useState(false);
    const [allMovies, setAllMovies] = useState(
        JSON.parse(localStorage.getItem('all-movies')) || []
    );
    const [filteredMovies, setFilteredMovies] = useState(
        JSON.parse(localStorage.getItem('filtered-movies')) || []
    );
    const [savedMovies, setSavedMovies] = useState(
        JSON.parse(localStorage.getItem('saved-movies')) || []
    );
    const [moviesForRendering, setMoviesForRendering] = useState(
        JSON.parse(localStorage.getItem('movies')) || []
    );
    const [tooltip, setTooltip] = useState({
        isVisible: false,
        message: ""
    });
    const [initialMoviesAmount, setInitialMoviesAmount] = useState(0); //изначальное количество фильмов для рендеринга
    const [moviesToAdd, setMoviesToAdd] = useState(0); //количество фильмов для доп. рендеринга при нажатии на кнопку ЕЩЁ
    const [numberOfClick, setNumberOfClick] = useState(0); //клики на кнопку ЕЩЁ

    const { pathname } = useLocation();

    const moviesAmount = initialMoviesAmount + moviesToAdd * numberOfClick; //количество отображаемых карточек с фильмами

    useEffect(() => {
        if (props.windowSize >= 1280) {
            setInitialMoviesAmount(moviesForRenderingAmount.largeWindowInitial);
            setMoviesToAdd(moviesForRenderingAmount.largeWindowAdded);
        } else if (props.windowSize < 1280 && props.windowSize >= 480) {
            setInitialMoviesAmount(moviesForRenderingAmount.middleWindowInitial);
            setMoviesToAdd(moviesForRenderingAmount.middleWindowAdded);
        } else if (props.windowSize < 480) {
            setInitialMoviesAmount(moviesForRenderingAmount.smallWindowInitial);
            setMoviesToAdd(moviesForRenderingAmount.smallWindowAdded);
        }
    }, [props.windowSize])

    useEffect(() => {
        if(!allMovies.length) {
            setAreMoviesLoading(true);
        }
        moviesApi.getAllMovies()
            .then(movies => {
                setAllMovies(movies)
            })
            .catch(err => {
                setAreMoviesLoading(false);
                setTooltip({ isVisible: true, message: "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз" });
            })
            .finally(() => {
                setAreMoviesLoading(false);
            })
    }, [])

    // useEffect(() => {
    //     mainApi.getSavedMovies()
    //     .then(res => console.log(movies))
    //     .catch(err => console.log(err))
    // }, [movies])

    useEffect(() => {
        localStorage.setItem('all-movies', JSON.stringify(allMovies));
    }, [allMovies]);

    useEffect(() => {
        localStorage.setItem('filtered-movies', JSON.stringify(filteredMovies));
        // localStorage.setItem('saved-movies', JSON.stringify(savedMovies));
    }, [filteredMovies]);

    // useEffect(() => {
    //     localStorage.setItem('saved-movies', JSON.stringify(savedMovies));
    // }, [savedMovies]);

    useEffect(() => {
        let isTooltip;
        let tooltipMessage;
        let uploadedMovies;
        if (pathname === paths.movies) {
            if (!wereMoviesUploaded && allMovies.length && !filteredMovies.length) {
                isTooltip = true;
                tooltipMessage = "Для поиска введите ключевое слово"
            } else if (wereMoviesUploaded && !filteredMovies.length) {
                isTooltip = true;
                tooltipMessage = "Ничего не найдено :(";
            }
            uploadedMovies = filteredMovies.slice(0, moviesAmount);
            setMoviesForRendering(uploadedMovies);
        } else {
            setAreMoviesLoading(false);
            uploadedMovies = savedMovies;
            isTooltip = !uploadedMovies.length;
            tooltipMessage = "Сохранённых фильмов нет";
        }
        localStorage.setItem(pathname.substring(1), JSON.stringify(uploadedMovies));

        setTooltip({ isVisible: isTooltip, message: tooltipMessage });
    }, [savedMovies, pathname, wereMoviesUploaded, moviesAmount, filteredMovies, allMovies]);

    async function getFilteredCards(keyWord, isShortMovies) {
        try {
            setNumberOfClick(0);
            if (isShortMovies) {
                setFilteredMovies(filterShortMovies(filterMovies(allMovies, keyWord)));
            } else {
                setFilteredMovies(filterMovies(allMovies, keyWord));
            }
        } catch (err) {
            setTooltip({ isVisible: true, message: "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз" });
        }
        finally {
            setAreMoviesLoading(false);
            setWereMoviesUploaded(true);
        }
    };

    function handleAddingMoreMovies() {
        setNumberOfClick((prev) => prev + 1);
    }

    function getfilteredSavedCards(keyWord, isShortMovies) {
        // setSearchSavedMoviesData({ inputValue: keyWord, isShortMovies: isShortMovies ?? false });
    }

    // function handleSaveMovie(movieData) {
    //     mainApi.addMovie({
    //         country: movieData?.country ?? 'No country',
    //         director: movieData?.director ?? 'No director',
    //         duration: movieData?.duration ?? 0,
    //         year: movieData?.year ?? '0000',
    //         description: movieData?.description ?? 'No description',
    //         image: movieData.image.url ? `https://api.nomoreparties.co${movieData.image.url}` : '',
    //         trailerLink: movieData?.trailerLink ?? '',
    //         thumbnail: movieData.image.formats.thumbnail.url ? 'https://api.nomoreparties.co' + movieData.image.formats.thumbnail.url : '',
    //         movieId: movieData.id,
    //         nameRU: movieData?.nameRU ?? 'No nameRU',
    //         nameEN: movieData?.nameEN ?? 'No nameEN',
    //     })
    //         .then((savedMovie) => {
    //             // console.log(savedMovie)
    //             setSavedMovies(prevUsersMovies => {
    //                 return [...prevUsersMovies, savedMovie];
    //             });
    //         })
    //         .catch(err => {
    //             console.log(err.message)
    //         });
    // }

    return (
        <main className="main">
            <Search getCards={pathname === paths.movies ? getFilteredCards : getfilteredSavedCards} />
            <MoviesCardList movies={moviesForRendering} savedMovies={savedMovies} />
            {tooltip.isVisible ? <MoviesTableTooltip text={tooltip.message} /> : null}
            {areMoviesLoading ? <Preloader /> : null}
            {moviesForRendering.length && moviesForRendering.length !== filteredMovies.length && pathname !== paths.savedMovies ? <MoreMovies handleClick={handleAddingMoreMovies} /> : null}
        </main>
    )
}

export default MoviesTable;



// For (const savedMovie of savedMovies) {
//     Movies.filter( movie => movie.id === savedMovie.id)[0].like = true;
//  } 