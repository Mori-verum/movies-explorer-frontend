import React,  { useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import MoviesTable from '../MoviesTable/MoviesTable'
import Profile from '../Profile/Profile';
import PageWithForm from '../PageWithForm/PageWithForm';
import Main from '../Main/Main';
import InputFieldset from '../InputFieldset/InputFieldset';

import { paths } from '../../utils/config';

import { cards, cardsSavedMovies } from '../../utils/cards';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

function App() {
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const { pathname } = useLocation();

  //состояние авторизации пользователя пока переключается вручную
  const loggedIn = true;

  const isHeaderVisible = Object.values(paths).includes(pathname)
    && (pathname !== paths.signIn)
    && (pathname !== paths.signUp);
  const isFooterVisible = Object.values(paths).includes(pathname)
    && (pathname !== paths.signIn)
    && (pathname !== paths.signUp)
    && (pathname !== paths.profile);

  const inputsForRegister = (
    <>
      <InputFieldset
        required={true}
        type="text"
        name="name"
        label="Имя"
        placeholder="Введите имя"
        id="profile-name"
        />
      <InputFieldset
        required={true}
        type="email"
        name="email"
        label="E-mail"
        placeholder="Введите email"
        id="profile-email"
      />
      <InputFieldset
        required={true}
        type="password"
        name="password"
        label="Пароль"
        placeholder="Введите пароль"
        id="profile-password"
      />
    </>
  )

  const inputsForLogin = (
    <>
      <InputFieldset
        required={true}
        type="email"
        name="email"
        label="E-mail"
        placeholder="Введите email"
        id="profile-email"
      />
      <InputFieldset
        required={true}
        type="password"
        name="password"
        label="Пароль"
        placeholder="Введите пароль"
        id="profile-password"
      />
    </>
  )

  return (
    <div className="App">
      {isHeaderVisible ? <Header windowSize={ windowSize } loggedIn={loggedIn} /> : null}
      <Routes>
        <Route exact path={paths.main} element={<Main />} />
        <Route path={paths.movies} element={<MoviesTable cards={cards} />} />
        <Route path={paths.savedMovies} element={<MoviesTable cards={cardsSavedMovies} />} />
        <Route path={paths.profile} element={<Profile />} />
        <Route path={paths.signUp} element={<PageWithForm
          formInputs={inputsForRegister}
          greetingText="Добро пожаловать!"
          formSubmitText="Зарегистрироваться"
          clickThroughText="Уже зарегистрированы?"
          clickThroughPath={paths.signIn}
          clickThroughLinkText="Войти"
        />} />
        <Route path={paths.signIn} element={<PageWithForm
          formInputs={inputsForLogin}
          greetingText="Рады видеть!"
          formSubmitText="Войти"
          clickThroughText="Ещё не зарегистрированы?"
          clickThroughPath={paths.signUp}
          clickThroughLinkText="Регистрация"
        />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {isFooterVisible ? <Footer /> : null}
    </div>
  );
}

export default App;
