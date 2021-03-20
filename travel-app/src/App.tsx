import React, { useEffect } from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { userCheckSession } from './redux/reducers/UserStateReduser';

import CountryPage from './components/CountryPage';
import Footer from './components/Footer';
import Header from './components/Header';
import MainPage from './components/MainPage';
import Signup from './components/Authorization/Signup';
import Login from './components/Authorization/Login';

const App: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(userCheckSession());
  }, []);

  return (
    <div className="PageContentWrapper">
      <BrowserRouter>
        <Header />
        <Route exact path="/" component={MainPage} />
        <Route path="/country/:ISOCode" component={CountryPage} />
        <Route path="/signup" component={Signup} />
        <Route path="/login" component={Login} />
        <Footer />
      </BrowserRouter>
    </div>
  );
};

export default App;
