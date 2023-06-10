import SearchForm from '../SearchForm/SearchForm';
import './Search.css'

function Search() {
    return (
        <section className="search">
            <div className="search__container container">
            <SearchForm />
            <span className="search__span"></span>
            </div>
        </section>
    )
}

export default Search;