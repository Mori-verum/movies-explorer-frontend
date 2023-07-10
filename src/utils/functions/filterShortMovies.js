export default function filterShortMovies(initialMovies) {
    return initialMovies.filter((movie) => movie.duration <= 40);
}