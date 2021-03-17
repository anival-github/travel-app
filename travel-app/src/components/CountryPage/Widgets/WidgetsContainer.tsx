import React from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../../redux/store';
import Currencies from './CurrencyWidget/Currencies';
import TimeWidgetContainer from './TimeWidget/TimeWidgetContainer';
import { getWeather } from '../../../redux/widgets-reducer';
import WeatherWidgetContainer from './WeatherWidget/WeatherWidgetContainer';

type MapDispatchToPropsType = {
  getWeather: (city: string) => Promise<void>,
};

type MapStateToPropsType = {
  weatherData: any,
};

type PropsType = MapDispatchToPropsType & MapStateToPropsType;

const WidgetsContainer: React.FC<PropsType> = ({ getWeather, weatherData }: PropsType) => {
  const city = 'Minsk';

  return (
    <div className="widgets-wrapper">
      <Currencies />
      <WeatherWidgetContainer city={city} getWeather={getWeather} weatherData={weatherData} />
      <TimeWidgetContainer languageCode="ru-RU" timeZone="Europe/Minsk" />
    </div>
  );
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  weatherData: state.widgets.weatherData,
});

export default connect(mapStateToProps, { getWeather })(WidgetsContainer);
