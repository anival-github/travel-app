/* eslint-disable @typescript-eslint/no-unused-vars */
import React, { useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { getAllCoutriesData } from '../../redux/countries-reducer';
import CountryCard from './CountryCard';
import compareCountry from '../../helpers/compareCountry';
import Cards from './Cards';

type MapStateToPropsType = {
  allCountriesData: any,
  searchQuery: string,
};

type MapDispatchToPropsType = {
  getAllCoutriesData: () => Promise<void>,
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const MainPage: React.FC<PropsType> = ({
  searchQuery, allCountriesData, getAllCoutriesData,
}: PropsType) => {
  useEffect(() => { getAllCoutriesData(); }, []);

  return (
    <Container className="mainpage" maxWidth="md">
      <Grid container spacing={4}>
        <Cards searchQuery={searchQuery} allCountriesData={allCountriesData} />
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  allCountriesData: state.countries.allCountriesData,
  searchQuery: state.search.searchQuery,
});

export default connect(mapStateToProps, { getAllCoutriesData })(MainPage);
