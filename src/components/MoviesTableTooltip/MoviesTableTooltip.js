import './MoviesTableTooltip.css'

function MoviesTableTooltip(props) {
    return (
        <section className="movies-table-tooltip">
            <div className="movies-table-tooltip__container container">
                <h2 className="movies-table-tooltip__text">{ props.text }</h2>
            </div>
        </section>
    )
}

export default MoviesTableTooltip;