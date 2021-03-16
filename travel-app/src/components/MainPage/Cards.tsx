import React from 'react';
import CountryCard from './CountryCard';
import compareCountry from '../../helpers/compareCountry';

type MapStateToPropsType = {
  allCountriesData: any,
  searchQuery: string,
};

type PropsType = MapStateToPropsType;

const lang = 'en-US';

const Cards: React.FC<PropsType> = ({ searchQuery, allCountriesData }: PropsType) => (
  allCountriesData
    && allCountriesData.reduce((acc: any, country: any) => {
      const { ISOCode, imageUrl, localizations } = country;

      const localisation = localizations.find((elem: any) => elem.lang === lang);
      const { name, capital } = localisation;

      const isCountryMatchSearchQuery = compareCountry(searchQuery, name, capital);

      if (!isCountryMatchSearchQuery) {
        return acc;
      }

      acc.push(<CountryCard ISOCode={ISOCode} imageUrl={imageUrl} countryName={name} />);

      return acc;
    }, [])
);

export default Cards;
