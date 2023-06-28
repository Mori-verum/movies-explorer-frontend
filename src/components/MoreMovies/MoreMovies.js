import { useState } from 'react';
import MoreMoviesButton from '../MoreMoviesButton/MoreMoviesButton';
import Preloader from '../Preloader/Preloader'
import './MoreMovies.css'

function MoreMovies() {
    const [isButtonHidden, setIsButtonHidden] = useState(false);
    const [isPreloaderHidden, setIsPreloaderHidden] = useState(true);

    function showMoreMovies() {
        setIsButtonHidden(true);
        setIsPreloaderHidden(false);
    }

    return (
        <section className="more-movies">
            <div className="more-movies__container container">
                <MoreMoviesButton onClick={ showMoreMovies } hidden={isButtonHidden} />
                <Preloader hidden={isPreloaderHidden}/>
            </div>
        </section>
    )
}

export default MoreMovies;