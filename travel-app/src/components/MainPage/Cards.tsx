import React from 'react';
import Alert from '@material-ui/lab/Alert';
import { makeStyles } from '@material-ui/core/styles';
import CountryCard from './CountryCard';
import compareCountry from '../../helpers/compareCountry';
import { ButtonsLocalisationType, LanguageType } from '../../redux/localisation-reducer';

type MapStateToPropsType = {
  allCountriesData: any,
  searchQuery: string,
  currentLanguage: LanguageType,
  currentButtonsLocalosation: ButtonsLocalisationType,
};

type PropsType = MapStateToPropsType;

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

const Cards: React.FC<PropsType> = ({
  searchQuery, allCountriesData, currentLanguage, currentButtonsLocalosation,
}: PropsType) => {
  const classes = useStyles();

  const buttonsNames = currentButtonsLocalosation.buttons;

  const cards = allCountriesData
    && allCountriesData.reduce((acc: any, country: any) => {
      const { ISOCode, imageUrl, localizations } = country;

      const localisation = localizations.find((elem: any) => elem.lang === currentLanguage);
      const { name, capital } = localisation;

      const isCountryMatchSearchQuery = compareCountry(searchQuery, name, capital);

      if (!isCountryMatchSearchQuery) {
        return acc;
      }

      acc.push(
        <CountryCard
          ISOCode={ISOCode}
          imageUrl={imageUrl}
          countryName={name}
          buttonsNames={buttonsNames}
        />,
      );

      return acc;
    }, []);

  if (cards && cards.length === 0) {
    return (
      <div className={classes.root}>
        <Alert severity="info">There is no information about this country</Alert>
      </div>
    );
  }

  return cards;
};

export default Cards;
