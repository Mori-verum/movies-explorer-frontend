import MoreMoviesButton from '../MoreMoviesButton/MoreMoviesButton';
import './MoreMovies.css'

function MoreMovies() {
    return (
        <section className="more-movies">
            <div className="more-movies__container container">
                <MoreMoviesButton />
            </div>
        </section>
    )
}

export default MoreMovies;