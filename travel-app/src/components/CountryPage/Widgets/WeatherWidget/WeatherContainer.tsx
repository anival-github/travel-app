import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ButtonsLocalisationType, LanguageType } from '../../../../redux/localisation-reducer';
import { AppStateType } from '../../../../redux/store';
import Weather from './Weather';
import { getWeather } from '../../../../redux/widgets-reducer';

type MapStateToPropsType = {
  weatherData: any,
  currentButtonsLocalisation: ButtonsLocalisationType,
  currentCountryData: any,
  currentLanguage: LanguageType,
};

type OwnPropsType = {};

type MapDispatchToPropsType = {
  getWeather: (city: string, currentLanguage: LanguageType) => Promise<void>,
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

const WeatherContainer: React.FC<PropsType> = ({
  weatherData, currentLanguage, currentCountryData,
  currentButtonsLocalisation, getWeather,
}: PropsType) => {
  const city = currentCountryData
  && currentCountryData.localizations.find(
    (localization: any) => localization.lang === 'en-US',
  ).capital;

  useEffect(() => {
    getWeather(city, currentLanguage);
  }, [city, currentLanguage]);

  return (
    <div className="widget">
      <Weather
        weatherData={weatherData}
        currentButtonsLocalisation={currentButtonsLocalisation}
      />
    </div>
  );
};

const MapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  weatherData: state.widgets.weatherData,
  currentButtonsLocalisation: state.localisation.currentButtonsLocalisation,
  currentCountryData: state.countries.currentCountryData,
  currentLanguage: state.localisation.currentLanguage,
});

export default connect(MapStateToProps, { getWeather })(WeatherContainer);
