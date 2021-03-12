import React from 'react';
import CountryVideo from './CountryVideo';
import MainInfo from './MainInfo';
import MapComponent from './MapComponent';
import Photos from './Photos';
import { Currencies, TimeWidget, WeatherWidget } from './vidgets';

const CountryPage:React.FC = () => (
  <div className="country-page-wrapper">
    <div className="widgets-wrapper">
      <Currencies />
      <WeatherWidget />
      <TimeWidget />
    </div>
    <MainInfo />
    <Photos />
    <CountryVideo />
    <MapComponent coordinates={[53.90899450883923, 27.549398216118476]} countryAbr="BLR" />
  </div>
);

export default CountryPage;
