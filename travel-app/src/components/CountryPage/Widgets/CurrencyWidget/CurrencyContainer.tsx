import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { AppStateType } from '../../../../redux/store';
import { getCurrencyRate } from '../../../../redux/widgets-reducer';
import { CurrencyType } from '../../../../types/currency-types';
import Currency from './Currency';

type MapStateToPropsType = {
  currencyRate: any,
};

type MapDispatchToPropsType = {
  getCurrencyRate: (сurrency: CurrencyType) => Promise<void>,
};

type OwnProps = {
  currentCountryData: any
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnProps;

const CurrencyContainer: React.FC<PropsType> = ({
  currentCountryData,
  currencyRate,
  getCurrencyRate,
}: PropsType) => {
  const currentCurrency = currentCountryData
    && currentCountryData.currency;

  useEffect(() => {
    getCurrencyRate(currentCurrency);
  }, [currentCurrency]);

  return (
    <Currency
      currencyRate={currencyRate}
      currentCurrency={currentCurrency}
    />
  );
};

const mapStateToProps = (state: AppStateType) => ({
  currencyRate: state.widgets.currencyRate,
});

export default connect(mapStateToProps, { getCurrencyRate })(CurrencyContainer);
