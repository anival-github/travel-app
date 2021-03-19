import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { getAllCoutriesData } from '../../redux/countries-reducer';
import CountryVideo from './CountryVideo';
import MainInfo from './MainInfo';
import MapComponent from './MapComponent';
import Photos from './Photos';
import WidgetsContainer from './Widgets/WidgetsContainer';
import Spinner from './spinner/Spinner';
import { LanguageType } from '../../redux/localisation-reducer';

const imgUrls = [
  { imgUrl: 'https://gls-space.ams3.digitaloceanspaces.com/lbcms-container-cz_excursions_resale/08a1eb18-e094-11ea-8545-baa2e45fb9df.webp', description: 'Description of photo', rating: 5 },
  { imgUrl: 'https://n1s1.elle.ru/ce/df/f6/cedff6cfbc22c90899cddf11f48ac830/940x741_0xc0a839a4_19250053081468488278.jpeg', description: 'Description of photo', rating: 5 },
  { imgUrl: 'https://st.depositphotos.com/1007930/2454/i/600/depositphotos_24543229-stock-photo-hong-kong.jpg', description: 'Description of photo', rating: 5 },
  { imgUrl: 'https://ichef.bbci.co.uk/news/640/cpsprodpb/1356F/production/_106051297_gettyimages-1131483632.jpg', description: 'Description of photo', rating: 5 },
  { imgUrl: 'https://www.iphones.ru/wp-content/uploads/2018/12/345C71E8-2FE2-4362-A8CB-BA600AB33F56.jpeg', description: 'Description of photo', rating: 5 },
];

type MapStateToPropsType = {
  allCountriesData: any,
};

type MapDispatchToPropsType = {
  getAllCoutriesData: () => Promise<void>,
};

type OwnProps = {
  currentLanguage: LanguageType,
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnProps;

const CountryPage:React.FC<PropsType> = ({
  currentLanguage, allCountriesData, getAllCoutriesData,
}: PropsType) => {
  useEffect(() => {
    if (!allCountriesData) {
      console.log('useEffect');
      getAllCoutriesData();
    }
  }, []);

  const { ISOCode } = useParams<any>();

  if (allCountriesData) {
    const {
      capitalLocation,
      imageUrl,
      localizations,
      videoUrl,
      // eslint-disable-next-line @typescript-eslint/naming-convention
      _id,
    } = allCountriesData.filter((item: any) => item.ISOCode === ISOCode)[0];
    const localisation = localizations.find((elem: any) => elem.lang === currentLanguage);
    const { name, capital, description } = localisation;

    return (
      <div className="country-page-wrapper">
        <WidgetsContainer />
        <MainInfo imgUrl={imageUrl} name={name} capital={capital} description={description} />
        <Photos countryId={_id} imgUrls={imgUrls} />
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
});

export default connect(mapStateToProps, { getAllCoutriesData })(CountryPage);
