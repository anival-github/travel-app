import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { connect, useDispatch } from 'react-redux';

import { userCheckSession } from './redux/reducers/UserStateReduser';
import { ButtonsLocalisationType, LanguageType } from './redux/localisation-reducer';
import { AppStateType } from './redux/store';

import CountryPage from './components/CountryPage';
import Footer from './components/Footer';
import Header from './components/Header';
import MainPage from './components/MainPage';
import Signup from './components/Authorization/Signup';
import Login from './components/Authorization/Login';

// import APIqueriesExample from './api/ServerAPI/APIQueriesExample';

// APIqueriesExample();// функция для демонстрации работы Server API функций.

type MapStateToPropsType = {
  currentLanguage: LanguageType,
  buttonsLocalisations: Array<ButtonsLocalisationType>,
};

type PropsType = MapStateToPropsType;

const App: React.FC<PropsType> = ({
  currentLanguage, buttonsLocalisations,
}: PropsType) => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userCheckSession());
  }, []);

  let currentButtonsLocalosation = buttonsLocalisations.find(
    (localisation) => localisation.lang === currentLanguage,
  );

  if (!currentButtonsLocalosation) {
    [currentButtonsLocalosation] = buttonsLocalisations;
  }

  return (
    <div>
      <BrowserRouter>
        <Header
          currentButtonsLocalosation={currentButtonsLocalosation}
        />
        <Route exact path="/">
          <MainPage
            currentLanguage={currentLanguage}
            currentButtonsLocalosation={currentButtonsLocalosation}
          />
        </Route>
        <Route path="/country/:ISOCode">
          <CountryPage currentLanguage={currentLanguage} />
        </Route>
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Footer />
      </BrowserRouter>
    </div>
  );
};

const MapStateToProps = (state: AppStateType) => ({
  currentLanguage: state.localisation.currentLanguage,
  buttonsLocalisations: state.localisation.buttonsLocalisations,
});

export default connect(MapStateToProps, {})(App);
