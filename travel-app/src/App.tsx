import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import CountryPage from './components/CountryPage';
import Footer from './components/Footer';
import Header from './components/Header';
import MainPage from './components/MainPage';
import Signup from './components/Authorization/Signup';

// import APIqueriesExample from './api/ServerAPI/APIQueriesExample';
// APIqueriesExample();// функция для демонстрации работы Server API функций.

const App:React.FC = () => (
  <div>
    <BrowserRouter>
      <Header />
      <Route exact path="/" component={MainPage} />
      <Route path="/country/:ISOCode" component={CountryPage} />
      {/* <Route path="/country" component={CountryPage} /> */}
      <Route path="/signup" component={Signup} />
      <Footer />
    </BrowserRouter>
  </div>
);

export default App;
