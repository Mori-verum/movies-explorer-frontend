export default function filterMovies(initialMovies, keyWord) {
    return initialMovies.filter((movie) => {
            if (movie.nameRU && movie.nameEN) {
              return (movie.nameRU + movie.nameEN).toLowerCase().includes(keyWord.toLowerCase());
            } else if (movie.nameEN) {
              return movie.nameEN.toLowerCase().includes(keyWord.toLowerCase());
            } else if (movie.nameRu) {
              return movie.nameRU.toLowerCase().includes(keyWord.toLowerCase());
            } else {
              return false;
            }
    })
}
