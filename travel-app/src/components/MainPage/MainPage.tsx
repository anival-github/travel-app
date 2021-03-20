import React, { useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { getAllCoutriesData } from '../../redux/countries-reducer';
import { ButtonsLocalisationType, LanguageType } from '../../redux/localisation-reducer';
import Cards from './Cards';
import { SetIsCountryPageOpenedType, setIsCountryPageOpened } from '../../redux/app-reducer';

type MapStateToPropsType = {
  allCountriesData: any,
  searchQuery: string,
  currentButtonsLocalisation: ButtonsLocalisationType,
  currentLanguage: LanguageType,
};

type MapDispatchToPropsType = {
  getAllCoutriesData: () => Promise<void>,
  setIsCountryPageOpened: (isCountryPageOpened: boolean) => SetIsCountryPageOpenedType,
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const MainPage: React.FC<PropsType> = ({
  currentLanguage,
  currentButtonsLocalisation,
  searchQuery,
  allCountriesData,
  getAllCoutriesData,
  setIsCountryPageOpened,
}: PropsType) => {
  useEffect(() => { getAllCoutriesData(); }, []);

  setIsCountryPageOpened(false);

  return (
    <Container className="mainpage" maxWidth="md">
      <Grid container spacing={4}>
        <Cards
          searchQuery={searchQuery}
          allCountriesData={allCountriesData}
          currentLanguage={currentLanguage}
          currentButtonsLocalisation={currentButtonsLocalisation}
        />
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  allCountriesData: state.countries.allCountriesData,
  searchQuery: state.search.searchQuery,
  currentButtonsLocalisation: state.localisation.currentButtonsLocalisation,
  currentLanguage: state.localisation.currentLanguage,
});

export default connect(
  mapStateToProps,
  {
    getAllCoutriesData,
    setIsCountryPageOpened,
  },
)(MainPage);
