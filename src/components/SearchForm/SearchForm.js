import { useEffect, useState } from 'react';
import SwitchButton from '../SwitchButton/SwitchButton';
import './SearchForm.css'
import { useLocation } from 'react-router-dom';
import { PATHS } from '../../utils/config'

function SearchForm({ getCards, isSearchFormActive }) {
    const { pathname } = useLocation();
    const [searchData, setSearchData] = useState(pathname === PATHS.movies ? JSON.parse(localStorage.getItem('search-movies-data')) ?? {
        inputValue: "",
        isShortMovies: false
    } : {
        inputValue: "",
        isShortMovies: false
    });

    useEffect(() => {
        setSearchData(pathname === PATHS.movies ? JSON.parse(localStorage.getItem('search-movies-data')) ?? {
            inputValue: "",
            isShortMovies: false
        } : {
            inputValue: "",
            isShortMovies: false
        })
    }, [pathname])

    useEffect(() => {
        if (pathname === PATHS.movies) {
            localStorage.setItem('search-movies-data', JSON.stringify(searchData));
        }
    }, [searchData, pathname]);

    function handleChange(evt) {
        setSearchData((prev) => ({ ...prev, inputValue: evt.target.value }));
    }

    function handleSwitchShortMovies(evt) {
        if (!searchData.isShortMovies) {
            setSearchData((prev) => ({ ...prev, isShortMovies: true }));
            getCards(searchData.inputValue, true);
        } else {
            setSearchData((prev) => ({ ...prev, isShortMovies: false }));
            getCards(searchData.inputValue, false);
        }
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        getCards(searchData.inputValue, searchData.isShortMovies);
    }

    return (
        <form className="search-form">
            <div className="search-form__container">
                <input disabled={!isSearchFormActive} value={searchData.inputValue} onChange={handleChange} required className="search-form__input" type="text" placeholder="Фильм"></input>
                <button disabled={!isSearchFormActive} onClick={handleSubmit} type="submit" className="search-form__submit button"></button>
            </div>
            <SwitchButton isDisabled={!isSearchFormActive} isSwitchButtonActive={searchData.isShortMovies} onClick={handleSwitchShortMovies} text="Короткометражки" />
        </form>
    )
}

export default SearchForm;