import React, { useEffect } from 'react';
import { Container, Grid } from '@material-ui/core';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { getAllCoutriesData } from '../../redux/countries-reducer';
import CountryCard from './CountryCard';
import compareCountry from '../../helpers/compareCountry';

type MapStateToPropsType = {
  allCountriesData: any,
  searchQuery: string,
};

type MapDispatchToPropsType = {
  getAllCoutriesData: () => Promise<void>,
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const lang = 'en-US';

const MainPage: React.FC<PropsType> = ({
  searchQuery, allCountriesData, getAllCoutriesData,
}: PropsType) => {
  useEffect(() => { getAllCoutriesData(); }, []);

  let cards;

  if (allCountriesData) {
    cards = allCountriesData.reduce((acc: any, country: any) => {
      const { ISOCode, imageUrl, localizations } = country;

      const localisation = localizations.find((elem: any) => elem.lang === lang);
      const { name, capital } = localisation;

      const isCountryMatchSearchQuery = compareCountry(searchQuery, name, capital);

      if (!isCountryMatchSearchQuery) {
        return acc;
      }

      acc.push(<CountryCard ISOCode={ISOCode} imageUrl={imageUrl} countryName={name} />);

      return acc;
    }, []);
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
  searchQuery: state.search.searchQuery,
});

export default connect(mapStateToProps, { getAllCoutriesData })(MainPage);
