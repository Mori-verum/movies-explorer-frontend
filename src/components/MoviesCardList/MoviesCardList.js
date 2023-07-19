import './MoviesCardList.css';

function MoviesCardList(props) {
    return (
        <section className="movies">
            <div className="movies__container container">
                {props.children}
            </div>
        </section>
    )
}

export default MoviesCardList;