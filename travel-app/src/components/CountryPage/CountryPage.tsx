import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';

import { getAllCoutriesData } from '../../redux/countries-reducer';
import { getAllPlacesData } from '../../redux/country-page-reducer';
import { LanguageType } from '../../redux/localisation-reducer';

import CountryVideo from './CountryVideo';
import MainInfo from './MainInfo';
import MapComponent from './MapComponent';
import Photos from './Photos';
import WidgetsContainer from './Widgets/WidgetsContainer';
import Spinner from './spinner/Spinner';
import { SetIsCountryPageOpenedType, setIsCountryPageOpened } from '../../redux/app-reducer';

type MapStateToPropsType = {
  allCountriesData: any,
  allPlacesData: any
};

type MapDispatchToPropsType = {
  getAllCoutriesData: () => Promise<void>,
  getAllPlacesData: (IsoCode: string) => Promise<void>,
  setIsCountryPageOpened: (isCountryPageOpened: boolean) => SetIsCountryPageOpenedType,
};

type OwnProps = {
  currentLanguage: LanguageType,
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnProps;

const CountryPage: React.FC<PropsType> = ({
  currentLanguage,
  allCountriesData,
  getAllCoutriesData,
  setIsCountryPageOpened,
  allPlacesData,
  getAllPlacesData,
}: PropsType) => {
  setIsCountryPageOpened(true);

  useEffect(() => {
    if (!allCountriesData) {
      getAllCoutriesData();
    }
  }, []);

  const { ISOCode } = useParams<any>();

  useEffect(() => {
    getAllPlacesData(ISOCode);
  }, [ISOCode]);

  if (allCountriesData) {
    const {
      capitalLocation,
      imageUrl,
      localizations,
      videoUrl,
    } = allCountriesData.filter((item: any) => item.ISOCode === ISOCode)[0];
    const localisation = localizations.find((elem: any) => elem.lang === currentLanguage);
    const { name, capital, description } = localisation;

    return (
      <div className="country-page-wrapper">
        <WidgetsContainer />
        <MainInfo imgUrl={imageUrl} name={name} capital={capital} description={description} />
        <Photos lang={currentLanguage} allPlaces={allPlacesData} />
        <div className="map-vs-video-container">
          <CountryVideo videoUrl={videoUrl} />
          <MapComponent
            capital={capital}
            coordinates={capitalLocation.coordinates}
            countryAbr={ISOCode}
          />
        </div>
      </div>
    );
  }
  return <Spinner />;
};

const mapStateToProps = (state: AppStateType) => ({
  allCountriesData: state.countries.allCountriesData,
  allPlacesData: state.places.allPlacesData,
});

export default connect(
  mapStateToProps,
  { getAllCoutriesData, setIsCountryPageOpened, getAllPlacesData },
)(CountryPage);
