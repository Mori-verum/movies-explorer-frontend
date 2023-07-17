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

import { PATHS } from '../../utils/config';
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
  const [profileEditingMessage, setProfileEditingMessage] = useState({ isSuccessful: false, message: '' });

  const { pathname } = useLocation();
  const navigate = useNavigate();

  const [isProfileEditing, setIsProfileEditing] = useState(false);

  const isHeaderVisible = Object.values(PATHS).includes(pathname)
    && (pathname !== PATHS.signIn)
    && (pathname !== PATHS.signUp);
  const isFooterVisible = Object.values(PATHS).includes(pathname)
    && (pathname !== PATHS.signIn)
    && (pathname !== PATHS.signUp)
    && (pathname !== PATHS.profile);

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
              navigate(pathname, { replace: true });
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
        return mainApi.login({
          email: data.email,
          password: data.password
        })
      })
      .then(() => {
        setLoggedIn(true);
        navigate(PATHS.movies, { replace: true });
      })
      .catch(err => {
        if (err === 409) {
          setRegisterMessage('Пользователь с таким email уже существует');
        } else {
          setRegisterMessage('Что-то пошло не так! Попробуйте ещё раз.');
        }
      })
      .finally(() => {
        setLoadingMessage({ isVisible: false, message: "" })
      })
  }

  useEffect(() => {
    setIsProfileEditing(false);
    setProfileEditingMessage({ isSuccessful: false, message: '' });
  }, [pathname])

  function handleLogin(data) {
    setLoginMessage('');
    setLoadingMessage({ isVisible: true, message: "Загрузка..." })
    mainApi.login({
      email: data.email,
      password: data.password
    })
      .then((data) => {
        if (data.token) {
          setLoggedIn(true);
        }
      })
      .catch(err => {
        if (err === 401) {
          setLoginMessage('Неправильные логин или пароль');
        } else {
          setLoginMessage('Что-то пошло не так! Попробуйте ещё раз.');
        }
      })
      .finally(() => {
        setLoadingMessage({ isVisible: false, message: "" })
      })
  }

  function handleLogout() {
    setLoggedIn(false);
    localStorage.clear();
    navigate(PATHS.main, { replace: true });
  }

  function handleEditProfile(userData) {
    setLoadingMessage({ isVisible: true, message: "Загрузка..." })
    mainApi.updateUserInfo(userData)
      .then((user) => {
        setUserData(user);
        setProfileEditingMessage({ isSuccessful: true, message: "Данные успешно изменены" });
        setIsProfileEditing(false);
      })
      .catch(err => {
        if (err === 409) {
          setProfileEditingMessage({ isSuccessful: false, message: "Пользователь с таким email уже существует" });
        } else {
          setProfileEditingMessage({ isSuccessful: false, message: "Что-то пошло не так! Попробуйте ещё раз." });
        }
      })
      .finally(() => {
        setLoadingMessage({ isVisible: false, message: "" })
      })
  }

  return (
    <currentUserContext.Provider value={userData}>
      <div className="App">
        {isHeaderVisible ? <Header windowSize={windowSize} loggedIn={loggedIn} /> : null}
        <Routes>
          <Route exact path={PATHS.main} element={<Main />} />
          <Route path={PATHS.movies} element={<ProtectedRouteElement
            element={AllMovies}
            loggedIn={loggedIn}
            windowSize={windowSize}
          />} />
          <Route path={PATHS.savedMovies} element={<ProtectedRouteElement
            element={SavedMovies}
            loggedIn={loggedIn}
          />} />
          <Route path={PATHS.profile} element={<ProtectedRouteElement
            element={Profile}
            setProfileEditingMessage={setProfileEditingMessage}
            isSuccessful={profileEditingMessage.isSuccessful}
            profileEditingMessage={profileEditingMessage.message}
            isLoadingMessage={loadingMessage.isVisible}
            loadingMessage={loadingMessage.message}
            setIsProfileEditing={setIsProfileEditing}
            isProfileEditing={isProfileEditing}
            handleEditProfile={handleEditProfile}
            handleLogout={handleLogout}
            loggedIn={loggedIn}
          />} />
          <Route path={PATHS.signUp} element={<PageWithForm
            loggedIn={loggedIn}
            form={<RegisterForm
              handleRegister={handleRegister}
              registerMessage={registerMessage}
              isLoadingMessage={loadingMessage.isVisible}
              loadingMessage={loadingMessage.message}
            />}
            greetingText="Добро пожаловать!"
            clickThroughText="Уже зарегистрированы?"
            clickThroughPath={PATHS.signIn}
            clickThroughLinkText="Войти"
          />} />
          <Route path={PATHS.signIn} element={<PageWithForm
            loggedIn={loggedIn}
            form={<LoginForm
              handleLogin={handleLogin}
              loginMessage={loginMessage}
              isLoadingMessage={loadingMessage.isVisible}
              loadingMessage={loadingMessage.message}
            />}
            greetingText="Рады видеть!"
            clickThroughText="Ещё не зарегистрированы?"
            clickThroughPath={PATHS.signUp}
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
