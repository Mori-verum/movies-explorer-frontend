import { useEffect, useState } from 'react';
import SwitchButton from '../SwitchButton/SwitchButton';
import './SearchForm.css'
import { useLocation } from 'react-router-dom';
import { paths } from '../../utils/config'

function SearchForm({ getCards }) {
    const { pathname } = useLocation();
    const [searchData, setSearchData] = useState(pathname === paths.movies ? JSON.parse(localStorage.getItem('search-movies-data')) ?? {
        inputValue: "",
        isShortMovies: false
    } : JSON.parse(localStorage.getItem('search-saved-movies-data')) ?? {
        inputValue: "",
        isShortMovies: false
    });

    useEffect(() => {
        setSearchData(pathname === paths.movies ? JSON.parse(localStorage.getItem('search-movies-data')) ?? {
            inputValue: "",
            isShortMovies: false
        } : JSON.parse(localStorage.getItem('search-saved-movies-data')) ?? {
            inputValue: "",
            isShortMovies: false
        })
    }, [pathname])

    useEffect(() => {
        if (pathname === paths.movies) {
            localStorage.setItem('search-movies-data', JSON.stringify(searchData));
        } else {
            localStorage.setItem('search-saved-movies-data', JSON.stringify(searchData));
        }
    }, [searchData, pathname]);

    function handleChange(evt) {
        setSearchData((prev) => ({...prev, inputValue: evt.target.value}));
    }

    function handleSwitchShortMovies(evt) {
        if(!searchData.isShortMovies) {
            setSearchData((prev) => ({...prev, isShortMovies: true}));
        } else {
            setSearchData((prev) => ({...prev, isShortMovies: false}));
        }
    }

    function handleSubmit(evt) {
        evt.preventDefault();
        getCards(searchData.inputValue, searchData.isShortMovies);
    }

    return (
        <form className="search-form">
            <div className="search-form__container">
                <input value={searchData.inputValue} onChange={handleChange} required className="search-form__input" type="text" placeholder="Фильм"></input>
                <button onClick={handleSubmit} type="submit" className="search-form__submit button"></button>
            </div>
            <SwitchButton isSwitchButtonActive={searchData.isShortMovies} onClick={handleSwitchShortMovies} text="Короткометражки" />
        </form>
    )
}

export default SearchForm;