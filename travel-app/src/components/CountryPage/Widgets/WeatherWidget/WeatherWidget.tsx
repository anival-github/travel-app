import React from 'react';

type MapStateToPropsType = {
  weatherData: any,
};

type PropsType = MapStateToPropsType;

const WeatherWidget: React.FC<PropsType> = ({ weatherData }: PropsType) => {
  const iconClass = weatherData ? `owf-${weatherData.weather[0].id}` : '';

  return (
    <div className="weather">
      <i className={`weather-icon owf ${iconClass}`} />
      <div className="temperature">
        Current:
        {' '}
        { weatherData && weatherData.main.temp}
        °C
      </div>
      <div className="weather-description">
        Precipitation:
        {' '}
        {weatherData && weatherData.weather[0].description}
      </div>
      <div className="humidity">
        Humidity:
        {' '}
        {weatherData && weatherData.main.humidity}
        %
      </div>
      <div className="wind">
        Wind Speed:
        {' '}
        {weatherData && weatherData.wind.speed}
        {' '}
        m/s
      </div>
      <div className="city" contentEditable="true" />
    </div>
  );
};

export default WeatherWidget;
