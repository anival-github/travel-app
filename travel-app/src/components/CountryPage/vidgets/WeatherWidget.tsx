import React, { useEffect, useState } from 'react';

const WeatherWidget: React.FC = () => {
  const [weatherData, setWeatherData] = useState<any>(null);
  const city = 'Minsk';

  useEffect(() => {
    ((async () => {
      const weatherAPIurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=f1fe9aa9627ddefce0cda42a7d10e141&units=metric`;

      const res = await fetch(weatherAPIurl);
      const data = await res.json();
      setWeatherData(data);
    })());
  }, [city]);

  console.log(weatherData);

  return (
    <div className="weather">
      <i className={`weather-icon owf ${weatherData && `owf-${weatherData.weather[0].id}`}`} />
      <div className="temperature">
        { weatherData && weatherData.main.temp}
        °C
      </div>
      <div className="weather-description">
        {weatherData && weatherData.weather[0].description}
      </div>
      <div className="humidity">
        Humidity:
        {weatherData && weatherData.main.humidity}
      </div>
      <div className="wind">
        Wind:
        {weatherData && weatherData.wind.speed}
        m/s
      </div>
      <div className="city" contentEditable="true" />
      WeatherWidget
    </div>
  );
};

export default WeatherWidget;
