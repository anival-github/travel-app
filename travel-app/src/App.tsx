import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import CountryPage from './components/CountryPage';
import Footer from './components/Footer';
import Header from './components/Header';
import MainPage from './components/MainPage';
import Signup from './components/Authorization/Signup';
import { userCheckSession } from './redux/reducers/UserStateReduser';
// import APIqueriesExample from './api/ServerAPI/APIQueriesExample';
// APIqueriesExample();// функция для демонстрации работы Server API функций.

const App:React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userCheckSession());
  }, []);
  return (
    <div>
      <BrowserRouter>
        <Header />
        <Route exact path="/" component={MainPage} />
        <Route path="/country/:ISOCode" component={CountryPage} />
        <Route path="/signup" component={Signup} />
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
