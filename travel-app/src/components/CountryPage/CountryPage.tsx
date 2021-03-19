import React, { useEffect } from 'react';
import { RouteComponentProps } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { getAllCoutriesData } from '../../redux/countries-reducer';
import { getAllPlacesData } from '../../redux/country-page-reducer';
import CountryVideo from './CountryVideo';
import MainInfo from './MainInfo';
import MapComponent from './MapComponent';
import Photos from './Photos';
import WidgetsContainer from './Widgets/WidgetsContainer';
import Spinner from './spinner/Spinner';

type MapStateToPropsType = {
  allCountriesData: any,
  allPlacesData: any
};

type MapDispatchToPropsType = {
  getAllCoutriesData: () => Promise<void>,
  getAllPlacesData: (IsoCode: string) => Promise<void>,
};

interface UrlParams {
  ISOCode: string
}

interface UrlProps extends RouteComponentProps<UrlParams> {}

type PropsType = MapStateToPropsType & MapDispatchToPropsType & RouteComponentProps & UrlProps;

const language = 'en-US';

const CountryPage:React.FC<PropsType> = ({
  match,
  allCountriesData,
  allPlacesData,
  getAllCoutriesData,
  getAllPlacesData,
}: PropsType) => {
  const IsoCode = match.params.ISOCode;

  useEffect(() => {
    if (!allCountriesData) {
      getAllCoutriesData();
    }
  }, []);

  useEffect(() => {
    getAllPlacesData(IsoCode);
  }, [IsoCode]);

  if (allCountriesData) {
    const {
      capitalLocation,
      imageUrl,
      localizations,
      videoUrl,
    } = allCountriesData.filter((item: any) => item.ISOCode === IsoCode)[0];
    const localisation = localizations.find((elem: any) => elem.lang === language);
    const { name, capital, description } = localisation;

    return (
      <div className="country-page-wrapper">
        <WidgetsContainer />
        <MainInfo imgUrl={imageUrl} name={name} capital={capital} description={description} />
        <Photos lang={language} allPlaces={allPlacesData} />
        <div className="map-vs-video-container">
          <CountryVideo videoUrl={videoUrl} />
          <MapComponent
            capital={capital}
            coordinates={capitalLocation.coordinates}
            countryAbr={IsoCode}
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

export default connect(mapStateToProps, { getAllCoutriesData, getAllPlacesData })(CountryPage);
