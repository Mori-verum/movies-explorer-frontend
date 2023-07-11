import { useState, useEffect } from 'react';
import { moviesForRenderingAmount } from '../../utils/config';

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
   }, [props.windowSize]);

   useEffect(() => {
      if (!moviesForRendering.length) {
         setAreMoviesLoading(true);
      }
      moviesApi.getAllMovies()
         .then(movies => {
            setAllMovies(movies);
            if (!wereMoviesUploaded && !moviesForRendering.length) {
               setTooltip({ isVisible: true, message: "Для поиска введите ключевое слово" });
            } else if (wereMoviesUploaded && !filteredMovies.length) {
               setTooltip({ isVisible: true, message: "Ничего не найдено :(" });
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
         })
   }, [])

   useEffect(() => {
      let uploadedMovies = filteredMovies.slice(0, moviesAmount);
      // for (const movie of filteredMovies.slice(0, moviesAmount)) {
      //    for (const savedMovie of savedMovies) {
      //       if (savedMovie.movieId === movie.id) {
      //          movie.liked = true;
      //       }
      //    }
      //    uploadedMovies.push(movie);
      // }
      setMoviesForRendering(uploadedMovies);

      localStorage.setItem('movies', JSON.stringify(uploadedMovies));
   }, [savedMovies, moviesAmount, filteredMovies]);

   useEffect(() => {
      mainApi.getSavedMovies()
         .then(res => setSavedMovies(res))
         .catch(err => {
            console.log(err);
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
         .then(() => {
            setSavedMovies((state) => state.filter((c) => c._id !== movieId))
         })
         .catch(err => console.log(err))
   }

   return (
      <main className="main">
         <Search getCards={getFilteredCards} />
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