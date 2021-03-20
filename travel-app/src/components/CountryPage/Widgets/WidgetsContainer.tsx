import React from 'react';
import CurrencyContainer from './CurrencyWidget/CurrencyContainer';
import TimeContainer from './TimeWidget/TimeContainer';
import WeatherContainer from './WeatherWidget/WeatherContainer';

const WidgetsContainer: React.FC = () => (
  <div className="widgets-wrapper">
    <CurrencyContainer />
    <WeatherContainer />
    <TimeContainer />
  </div>
);

export default WidgetsContainer;
