import React, { useEffect } from 'react';

const WeatherWidget: React.FC = () => {
  const city = 'Minsk';
  let weatherData;

  useEffect(() => {
    ((async () => {
      const weatherAPIurl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&lang=en&appid=f1fe9aa9627ddefce0cda42a7d10e141&units=metric`;
      const res = await fetch(weatherAPIurl);
      weatherData = await res.json();
    })());
  }, [city]);

  console.log(weatherData);

  return (
    <div className="weather">
      {/* <i className={`weather-icon owf owf-${data.weather[0].id}}`} /> */}
      <div className="temperature">
        {/* {data.main.temp} */}
        °C
      </div>
      <div className="weather-description">
        {/* {data.weather[0].description} */}
      </div>
      <div className="humidity">
        Humidity:
        {/* {data.main.humidity} */}
      </div>
      <div className="wind">
        Wind:
        {/* {data.wind.speed} */}
        m/s
      </div>
      <div className="city" contentEditable="true" />
      WeatherWidget
    </div>
  );
};

export default WeatherWidget;
