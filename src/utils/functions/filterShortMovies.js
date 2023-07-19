import { SHORT_MOVIE_DURATION } from "../config";

export default function filterShortMovies(initialMovies) {
    return initialMovies.filter((movie) => movie.duration <= SHORT_MOVIE_DURATION);
}