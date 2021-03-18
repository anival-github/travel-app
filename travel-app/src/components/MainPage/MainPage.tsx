import React, { useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { getAllCoutriesData } from '../../redux/countries-reducer';
import Cards from './Cards';
import { ButtonsLocalisationType, LanguageType } from '../../redux/localisation-reducer';

type MapStateToPropsType = {
  allCountriesData: any,
  searchQuery: string,
};

type MapDispatchToPropsType = {
  getAllCoutriesData: () => Promise<void>,
};

type OwnTypes = {
  currentLanguage: LanguageType,
  currentButtonsLocalosation: ButtonsLocalisationType,
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnTypes;

const MainPage: React.FC<PropsType> = ({
  currentLanguage, currentButtonsLocalosation, searchQuery, allCountriesData, getAllCoutriesData,
}: PropsType) => {
  useEffect(() => { getAllCoutriesData(); }, []);

  return (
    <Container className="mainpage" maxWidth="md">
      <Grid container spacing={4}>
        <Cards
          searchQuery={searchQuery}
          allCountriesData={allCountriesData}
          currentLanguage={currentLanguage}
          currentButtonsLocalosation={currentButtonsLocalosation}
        />
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  allCountriesData: state.countries.allCountriesData,
  searchQuery: state.search.searchQuery,
});

export default connect(mapStateToProps, { getAllCoutriesData })(MainPage);
