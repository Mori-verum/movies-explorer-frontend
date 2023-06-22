import React from 'react';
import { Route, Routes } from 'react-router-dom'
import './App.css';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import MoviesTable from '../MoviesTable/MoviesTable'
import Profile from '../Profile/Profile';
import PageWithForm from '../PageWithForm/PageWithForm';
import Main from '../Main/Main';
import InputFieldset from '../InputFieldset/InputFieldset';

// import { useLocation } from 'react-router-dom';

import { cards, cardsSavedMovies } from '../../utils/cards';
import NotFoundPage from '../NotFoundPage/NotFoundPage';

function App() {
  //пока не используется логика приложения, используется "хардкод" для отображения элементов, которым можно управлять из основного компонента
  // let { pathname } = useLocation();

  const loggedIn = false;
  // const isHeaderVisible = ( pathname === "/signup" || pathname === "/signin")  ? false : true;
  // const isFooterVisible = ( pathname === "/signup" || pathname === "/signin" ) ? false : true;
  const isHeaderVisible = true;
  const isFooterVisible = true;

  const inputsForRegister = (
    <>
      <InputFieldset name="name" label="Имя" />
      <InputFieldset name="email" label="E-mail" />
      <InputFieldset name="password" label="Пароль" />
    </>
  )

  const inputsForLogin = (
    <>
      <InputFieldset name="email" label="E-mail" />
      <InputFieldset name="password" label="Пароль" />
    </>
  )

  return (
    <div className="App">
      {isHeaderVisible ? <Header loggedIn={ loggedIn } /> : null}
      <Routes>
        <Route exact path="/" element={<Main />} />
        <Route path="/movies" element={<MoviesTable cards={cards} />} />
        <Route path="/saved-movies" element={<MoviesTable cards={cardsSavedMovies} />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/signup" element={<PageWithForm
          formInputs={inputsForRegister}
          greetingText="Добро пожаловать!"
          formSubmitText="Зарегистрироваться"
          clickThroughText="Уже зарегистрированы?"
          clickThroughPath="/signin"
          clickThroughLinkText="Войти"
        />} />
        <Route path="/signin" element={<PageWithForm
          formInputs={inputsForLogin}
          greetingText="Рады видеть!"
          formSubmitText="Войти"
          clickThroughText="Ещё не зарегистрированы?"
          clickThroughPath="/signup"
          clickThroughLinkText="Регистрация"
        />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {isFooterVisible ? <Footer /> : null}
    </div>
  );
}

export default App;
