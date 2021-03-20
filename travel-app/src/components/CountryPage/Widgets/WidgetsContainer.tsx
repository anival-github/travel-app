import React from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../../redux/store';
import CurrencyContainer from './CurrencyWidget/CurrencyContainer';
import TimeWidgetContainer from './TimeWidget/TimeWidgetContainer';
import { getWeather } from '../../../redux/widgets-reducer';
import WeatherWidgetContainer from './WeatherWidget/WeatherWidgetContainer';

type MapDispatchToPropsType = {
  getWeather: (city: string) => Promise<void>,
};

type MapStateToPropsType = {
  weatherData: any,
  currentCountryData: any,
};

type PropsType = MapDispatchToPropsType & MapStateToPropsType;

const WidgetsContainer: React.FC<PropsType> = ({
  getWeather, weatherData, currentCountryData,
}: PropsType) => {
  const city = 'Minsk';

  return (
    <div className="widgets-wrapper">
      <CurrencyContainer currentCountryData={currentCountryData} />
      <WeatherWidgetContainer city={city} getWeather={getWeather} weatherData={weatherData} />
      <TimeWidgetContainer languageCode="ru-RU" timeZone="Europe/Minsk" />
    </div>
  );
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  weatherData: state.widgets.weatherData,
  currentCountryData: state.countries.currentCountryData,
});

export default connect(mapStateToProps, { getWeather })(WidgetsContainer);
