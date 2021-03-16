import React, { useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { getAllCoutriesData } from '../../redux/countries-reducer';
import CountryCard from './CountryCard';

type MapStateToPropsType = {
  allCountriesData: any,
};

type MapDispatchToPropsType = {
  getAllCoutriesData: () => Promise<void>,
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const lang = 'en-US';

const MainPage: React.FC<PropsType> = ({ allCountriesData, getAllCoutriesData }: PropsType) => {
  useEffect(() => { getAllCoutriesData(); }, []);

  let cards;

  if (allCountriesData) {
    cards = allCountriesData.map((country: any) => {
      const { ISOCode, imageUrl, localizations } = country;

      const localisation = localizations.find((elem: any) => elem.lang === lang);
      const countryName = localisation.name;

      return (
        <CountryCard
          ISOCode={ISOCode}
          imageUrl={imageUrl}
          countryName={countryName}
        />
      );
    });
  }

  return (
    <Container className="mainpage" maxWidth="md">
      <Grid container spacing={4}>
        {cards}
      </Grid>
    </Container>
  );
};

const mapStateToProps = (state: AppStateType) => ({
  allCountriesData: state.countries.allCountriesData,
});

export default connect(mapStateToProps, { getAllCoutriesData })(MainPage);
