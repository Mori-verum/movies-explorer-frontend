import SearchForm from '../SearchForm/SearchForm';
import './Search.css'

function Search(props) {
    return (
        <section className="search">
            <div className="search__container container">
                <SearchForm getCards={props.getCards} />
                <span className="search__span"></span>
            </div>
        </section>
    )
}

export default Search;