import React from 'react';
import { BrowserRouter, Route } from 'react-router-dom';
import CountryPage from './components/CountryPage';
import Footer from './components/Footer';
import Header from './components/Header';
import MainPage from './components/MainPage';

const App:React.FC = () => (
  <div>
    <BrowserRouter>
      <Header />
      <Route exact path="/" component={MainPage} />
      <Route path="/country" component={CountryPage} />
      <Footer />
    </BrowserRouter>
  </div>
);

export default App;
