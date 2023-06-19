import React from 'react';
import { Route, Routes } from 'react-router-dom'
import './App.css';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import MoviesTable from '../MoviesTable/MoviesTable'
import Profile from '../Profile/Profile'
import Register from '../PageWithForm/PageWithForm'
import Login from '../Login/Login'
import Main from '../Main/Main';

import { cards, cardsSavedMovies } from '../../utils/cards';

function App() {
  const loggedIn = false;
  const isHeaderVisible = false;
  const isFooterVisible = false;

  return (
    <div className="App">
      { isHeaderVisible ? <Header loggedIn={ loggedIn } /> : null }
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/movies" element={<MoviesTable cards={ cards } />} />
        <Route path="/saved-movies" element={<MoviesTable cards={ cardsSavedMovies } />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
      </Routes>
      { isFooterVisible ? <Footer /> : null }
    </div>
  );
}

export default App;
