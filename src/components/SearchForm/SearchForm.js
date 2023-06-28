import SwitchButton from '../SwitchButton/SwitchButton';
import './SearchForm.css'

function SearchForm() {
    return (
        <form className="search-form">
            <div className="search-form__container">
                <input required className="search-form__input" type="text" placeholder="Фильм"></input>
                <button type="submit" className="search-form__submit button"></button>
            </div>
            <SwitchButton text="Короткометражки" />
        </form>
    )
}

export default SearchForm;