import React from 'react';
import { ButtonsLocalisationType } from '../../../../redux/localisation-reducer';

type PropsType = {
  weatherData: any,
  currentButtonsLocalisation: ButtonsLocalisationType,
};

const Weather: React.FC<PropsType> = ({
  weatherData, currentButtonsLocalisation,
}: PropsType) => {
  const iconClass = weatherData ? `owf-${weatherData.weather[0].id}` : '';
  const { temperature, weatherDescription, humidity } = currentButtonsLocalisation.buttons;

  return (
    <div className="weather">
      <i className={`weather-icon owf ${iconClass}`} />
      <div className="temperature">
        {`${temperature}: ${weatherData && weatherData.main.temp} °C`}
      </div>
      <div className="weather-description">
        {`${weatherDescription}: ${weatherData && weatherData.weather[0].description}`}
      </div>
      <div className="humidity">
        {`${humidity}: ${weatherData && weatherData.main.humidity}%`}
      </div>
    </div>
  );
};

export default Weather;
