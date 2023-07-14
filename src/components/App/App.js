import React, { useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate } from 'react-router-dom'
import './App.css';
import Header from '../Header/Header'
import Footer from '../Footer/Footer'
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
import AllMovies from '../AllMovies/AllMovies';
import SavedMovies from '../SavedMovies/SavedMovies';


function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState({ name: '', email: '' });
  const [windowSize, setWindowSize] = useState(window.innerWidth);
  const [loginMessage, setLoginMessage] = useState('');
  const [registerMessage, setRegisterMessage] = useState('');
  const [loadingMessage, setLoadingMessage] = useState({ isVisible: false, message: "" });

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isProfileEditing, setIsProfileEditing] = useState(false);

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
              navigate(paths.movies, { replace: true })
            }
          })
          .catch(err => console.log(err));
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

  function handleRegister(data) {
    setRegisterMessage('');
    setLoadingMessage({ isVisible: true, message: "Загрузка..." })
    mainApi.register({
      name: data.name,
      email: data.email,
      password: data.password
    })
      .then((res) => {
        if (res === 409) {
          setRegisterMessage('Пользователь с таким email уже существует');
        } else {
          navigate(paths.signIn, { replace: true });
        }
      })
      .catch(err => {
        setRegisterMessage('Что-то пошло не так! Попробуйте ещё раз.');
      })
      .finally(() => {
        setLoadingMessage({ isVisible: false, message: "" })
      })
  }

  useEffect(() => {
    setIsProfileEditing(false);
  }, [pathname])

  function handleLogin(data) {
    setLoginMessage('');
    setLoadingMessage({ isVisible: true, message: "Загрузка..." })
    mainApi.login({
      email: data.email,
      password: data.password
    })
      .then((data) => {
        if (data === 401) {
          setLoginMessage('Неправильные логин или пароль');
        } else if (data.token) {
          setLoggedIn(true);
        }
      })
      .catch(err => {
        setLoginMessage('Что-то пошло не так! Попробуйте ещё раз.');
      })
      .finally(() => {
        setLoadingMessage({ isVisible: false, message: "" })
      })
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.clear();
    navigate(paths.signIn, { replace: true });
  }

  function handleEditProfile(userData) {
    setLoadingMessage({ isVisible: true, message: "Загрузка..." })
    mainApi.updateUserInfo(userData)
      .then((user) => {
        setUserData(user);
        setIsProfileEditing(false);
      })
      .catch(err => console.log(err))
      .finally(() => {
        setLoadingMessage({ isVisible: false, message: "" })
      })
  }

  return (
    <currentUserContext.Provider value={userData}>
      <div className="App">
        {isHeaderVisible ? <Header windowSize={windowSize} loggedIn={loggedIn} /> : null}
        <Routes>
          <Route exact path={paths.main} element={<Main />} />
          <Route path={paths.movies} element={<ProtectedRouteElement
            element={AllMovies}
            loggedIn={loggedIn}
            windowSize={windowSize}
          />} />
          <Route path={paths.savedMovies} element={<ProtectedRouteElement
            element={SavedMovies}
            loggedIn={loggedIn}
          />} />
          <Route path={paths.profile} element={<ProtectedRouteElement
            element={Profile}
            isLoadingMessage={loadingMessage.isVisible}
            loadingMessage={loadingMessage.message}
            setIsProfileEditing={setIsProfileEditing}
            isProfileEditing={isProfileEditing}
            handleEditProfile={handleEditProfile}
            handleLogout={handleLogout}
            loggedIn={loggedIn}
            windowSize={windowSize}
          />} />
          <Route path={paths.signUp} element={<PageWithForm
            form={<RegisterForm
              handleRegister={handleRegister}
              registerMessage={registerMessage}
              isLoadingMessage={loadingMessage.isVisible}
              loadingMessage={loadingMessage.message}
            />}
            greetingText="Добро пожаловать!"
            clickThroughText="Уже зарегистрированы?"
            clickThroughPath={paths.signIn}
            clickThroughLinkText="Войти"
          />} />
          <Route path={paths.signIn} element={<PageWithForm
            form={<LoginForm
              handleLogin={handleLogin}
              loginMessage={loginMessage}
              isLoadingMessage={loadingMessage.isVisible}
              loadingMessage={loadingMessage.message}
            />}
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
