import { useState, useEffect } from 'react';
import { MOVIES_FOR_RENDERING_AMOUNT, WINDOW_SIZE_1280, WINDOW_SIZE_480 } from '../../utils/config';

import Search from '../Search/Search';
import MoreMovies from '../MoreMovies/MoreMovies';

import { moviesApi } from '../../utils/Api/MoviesApi';
import { mainApi } from '../../utils/Api/MainApi';
import filterMovies from '../../utils/functions/filterMovies';
import filterShortMovies from '../../utils/functions/filterShortMovies';
import MoviesTableTooltip from '../MoviesTableTooltip/MoviesTableTooltip';
import Preloader from '../Preloader/Preloader';
import AllMoviesCardList from '../AllMoviesCardList/AllMoviesCardList';

function AllMovies(props) {
   const [isSearchFormActive, setIsSearchFormActive] = useState(false);
   const [areMoviesLoading, setAreMoviesLoading] = useState(false); //для отображения прелоадера
   const [wereMoviesUploaded, setWereMoviesUploaded] = useState(false);
   const [allMovies, setAllMovies] = useState(
      JSON.parse(localStorage.getItem('all-movies')) || []);
   const [filteredMovies, setFilteredMovies] = useState(
      JSON.parse(localStorage.getItem('filtered-movies')) || []);
   const [savedMovies, setSavedMovies] = useState(
      JSON.parse(localStorage.getItem('saved-movies')) || []);
   const [moviesForRendering, setMoviesForRendering] = useState(
      JSON.parse(localStorage.getItem('movies')) || []);
   const [tooltip, setTooltip] = useState({
      isVisible: false,
      message: ""
   });
   const [initialMoviesAmount, setInitialMoviesAmount] = useState(0); //изначальное количество фильмов для рендеринга
   const [moviesToAdd, setMoviesToAdd] = useState(0); //количество фильмов для доп. рендеринга при нажатии на кнопку ЕЩЁ
   const [numberOfClick, setNumberOfClick] = useState(0); //клики на кнопку ЕЩЁ

   const moviesAmount = initialMoviesAmount + moviesToAdd * numberOfClick; //количество отображаемых карточек с фильмами

   useEffect(() => {
      localStorage.setItem('all-movies', JSON.stringify(allMovies));
      localStorage.setItem('filtered-movies', JSON.stringify(filteredMovies));
      localStorage.setItem('saved-movies', JSON.stringify(savedMovies));
      localStorage.setItem('movies', JSON.stringify(moviesForRendering));
   }, [allMovies, filteredMovies, savedMovies, moviesForRendering]);

   useEffect(() => {
      if (props.windowSize >= WINDOW_SIZE_1280) {
         setInitialMoviesAmount(MOVIES_FOR_RENDERING_AMOUNT.largeInitialCardsAmount);
         setMoviesToAdd(MOVIES_FOR_RENDERING_AMOUNT.largeCardsCountToAdd);
      } else if (props.windowSize < WINDOW_SIZE_1280 && props.windowSize >= WINDOW_SIZE_480) {
         setInitialMoviesAmount(MOVIES_FOR_RENDERING_AMOUNT.middleInitialCardsAmount);
         setMoviesToAdd(MOVIES_FOR_RENDERING_AMOUNT.middleCardsCountToAdd);
      } else if (props.windowSize < WINDOW_SIZE_480) {
         setInitialMoviesAmount(MOVIES_FOR_RENDERING_AMOUNT.smallInitialCardsAmount);
         setMoviesToAdd(MOVIES_FOR_RENDERING_AMOUNT.smallCardsCountToAdd);
      }
   }, [props.windowSize]);

   useEffect(() => {
      if (!moviesForRendering.length) {
         setAreMoviesLoading(true);
      }
      setIsSearchFormActive(false);
      moviesApi.getAllMovies()
         .then(movies => {
            setAllMovies(movies);
            if (!wereMoviesUploaded && !moviesForRendering.length) {
               setTooltip({ isVisible: true, message: "Для поиска введите ключевое слово" });
            }
         })
         .catch(err => {
            console.log(err);
            setTooltip({
               isVisible: true,
               message: "Во время запроса произошла ошибка. Возможно, проблема с соединением или сервер недоступен. Подождите немного и попробуйте ещё раз"
            });
         })
         .finally(() => {
            setAreMoviesLoading(false);
            setIsSearchFormActive(true);
         })
   }, [])

   useEffect(() => {
      setTooltip({ isVisible: false, message: "" });
      let uploadedMovies = filteredMovies.slice(0, moviesAmount);
      setMoviesForRendering(uploadedMovies);
      if (wereMoviesUploaded && !uploadedMovies.length) {
         setTooltip({ isVisible: true, message: "Ничего не найдено :(" });
      }

      localStorage.setItem('movies', JSON.stringify(uploadedMovies));
   }, [savedMovies, moviesAmount, filteredMovies, wereMoviesUploaded]);

   useEffect(() => {
      setIsSearchFormActive(false);
      mainApi.getSavedMovies()
         .then(res => setSavedMovies(res))
         .catch(err => {
            console.log(err);
         })
         .finally(() => {
            setIsSearchFormActive(true);
         })
   }, [])

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

   function handleSaveMovie(movieData) {
      mainApi.addMovie({
         country: movieData?.country ?? 'No country',
         director: movieData?.director ?? 'No director',
         duration: movieData?.duration ?? 0,
         year: movieData?.year ?? '0000',
         description: movieData?.description ?? 'No description',
         image: movieData.image.url ? `https://api.nomoreparties.co${movieData.image.url}` : '',
         trailer: movieData?.trailerLink ?? '',
         thumbnail: movieData.image.formats.thumbnail.url ? 'https://api.nomoreparties.co' + movieData.image.formats.thumbnail.url : '',
         movieId: movieData.id,
         nameRU: movieData?.nameRU ?? 'No nameRU',
         nameEN: movieData?.nameEN ?? 'No nameEN',
      })
         .then((savedMovie) => {
            setSavedMovies(prevSavedMovies => {
               return [...prevSavedMovies, savedMovie];
            });
         })
         .catch(err => console.log(err));
   }

   function handleDeleteMovie(movieId) {
      mainApi.deleteMovie(movieId)
         .then((res) => {
            return savedMovies.filter((c) => c._id !== movieId);
         })
         .then((res) => setSavedMovies(res))
         .catch(err => console.log(err))
   }

   return (
      <main className="main">
         <Search
            getCards={getFilteredCards}
            isSearchFormActive={isSearchFormActive}
         />
         <AllMoviesCardList
            handleDeleteMovie={handleDeleteMovie}
            handleSaveMovie={handleSaveMovie}
            savedMovies={savedMovies}
            movies={moviesForRendering}
         />
         {tooltip.isVisible ? <MoviesTableTooltip text={tooltip.message} /> : null}
         {areMoviesLoading ? <Preloader /> : null}
         {moviesForRendering.length && moviesForRendering.length !== filteredMovies.length ? <MoreMovies handleClick={handleAddingMoreMovies} /> : null}
      </main>
   )
}

export default AllMovies;