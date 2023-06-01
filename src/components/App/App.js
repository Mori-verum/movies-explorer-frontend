import React from 'react';
import { Route, Routes } from 'react-router-dom'
import './App.css';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import AboutProject from '../AboutProject/AboutProject'
import Movies from '../Movies/Movies'
import SavedMovies from '../SavedMovies/SavedMovies'
import Profile from '../Profile/Profile'
import Register from '../Register/Register'
import Login from '../Login/Login'

function App() {
  return (
    <div className="App">
      <Header />
      <Routes>
        <Route exact path="/" element={<AboutProject />} />
        <Route path="/movies" element={<Movies />} />
        <Route path="/saved-movies" element={<SavedMovies />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<Register />} />
        <Route path="/signin" element={<Login />} />
      </Routes>
      <Footer />
    </div>
  );
}

export default App;
