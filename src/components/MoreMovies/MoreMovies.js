import MoreMoviesButton from '../MoreMoviesButton/MoreMoviesButton';
import './MoreMovies.css'

function MoreMovies(props) {
    return (
        <section className="more-movies">
            <div className="more-movies__container container">
                <MoreMoviesButton onClick={props.handleClick} />
            </div>
        </section>
    )
}

export default MoreMovies;