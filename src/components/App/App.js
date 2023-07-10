import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
import MoviesTable from '../MoviesTable/MoviesTable'
import Profile from '../Profile/Profile';
import PageWithForm from '../PageWithForm/PageWithForm';
import Main from '../Main/Main';
import NotFoundPage from '../NotFoundPage/NotFoundPage';
import ProtectedRouteElement from '../ProtectedRouteElement/ProtectedRouteElement';
import LoginForm from '../LoginForm/LoginForm';

import { paths } from '../../utils/config';
import RegisterForm from '../RegisterForm/RegisterForm';
import { mainApi } from '../../utils/Api/MainApi';
import currentUserContext from '../../contexts/currentUserContext';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [windowSize, setWindowSize] = useState(window.innerWidth);

  const { pathname } = useLocation();

  const isHeaderVisible = Object.values(paths).includes(pathname)
    && (pathname !== paths.signIn)
    && (pathname !== paths.signUp);
  const isFooterVisible = Object.values(paths).includes(pathname)
    && (pathname !== paths.signIn)
    && (pathname !== paths.signUp)
    && (pathname !== paths.profile);

  useEffect(() => {
    if (localStorage.getItem('token')) {
      const token = localStorage.getItem('token');

      if (token) {
        mainApi.getCurrentUser(token)
          .then((res) => {
            if (res) {
              const userData = {
                name: res.name,
                email: res.email
              }
              setLoggedIn(true);
              setUserData(userData);
            }
          });
      }
    }
  }, [loggedIn]);

  //отслеживаем изменение размеров окна
  useEffect(() => {
    const handleResize = (event) => {
      setWindowSize(event.target.innerWidth);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  function handleLogin() {
    setLoggedIn(true);
  }

  function handleLogout() {
    localStorage.removeItem('token');
    setLoggedIn(false);
  }

  return (
    <currentUserContext.Provider value={ userData }>
    <div className="App">
      {isHeaderVisible ? <Header windowSize={windowSize} loggedIn={loggedIn} /> : null}
      <Routes>
        <Route exact path={paths.main} element={<Main />} />
        <Route path={paths.movies} element={<ProtectedRouteElement
          element={MoviesTable}
          loggedIn={loggedIn}
          windowSize={windowSize}
        />} />
        <Route path={paths.savedMovies} element={<ProtectedRouteElement
          element={MoviesTable}
          loggedIn={loggedIn}
        />} />
        <Route path={paths.profile} element={<ProtectedRouteElement
          element={Profile}
          handleLogout={handleLogout}
          // profileData={userData}
          loggedIn={loggedIn}
          windowSize={windowSize}
        />} />
        <Route path={paths.signUp} element={<PageWithForm
          form={<RegisterForm />}
          greetingText="Добро пожаловать!"
          clickThroughText="Уже зарегистрированы?"
          clickThroughPath={paths.signIn}
          clickThroughLinkText="Войти"
        />} />
        <Route path={paths.signIn} element={<PageWithForm
          form={<LoginForm handleLogin={handleLogin} />}
          greetingText="Рады видеть!"
          clickThroughText="Ещё не зарегистрированы?"
          clickThroughPath={paths.signUp}
          clickThroughLinkText="Регистрация"
        />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
      {isFooterVisible ? <Footer /> : null}
    </div>
    </currentUserContext.Provider>
  );
}

export default App;
