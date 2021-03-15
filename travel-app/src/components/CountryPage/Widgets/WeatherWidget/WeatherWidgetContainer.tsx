import React, { useEffect } from 'react';
import WeatherWidget from './WeatherWidget';

type PropsType = {
  weatherData: any,
  getWeather: (city: string) => Promise<void>,
  city: string,
};

const WeatherWidgetContainer: React.FC<PropsType> = ({
  city, getWeather, weatherData,
}: PropsType) => {
  useEffect(() => {
    getWeather(city);
  }, [city]);

  return (
    <WeatherWidget weatherData={weatherData} />
  );
};

export default WeatherWidgetContainer;
