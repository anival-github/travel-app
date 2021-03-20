import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { ButtonsLocalisationType } from '../../../../redux/localisation-reducer';
import { AppStateType } from '../../../../redux/store';
import { getCurrencyRate } from '../../../../redux/widgets-reducer';
import { CurrencyType } from '../../../../types/currency-types';
import Currency from './Currency';

type MapStateToPropsType = {
  currencyRate: any,
  currentButtonsLocalisation: ButtonsLocalisationType,
  currentCountryData: any,
};

type MapDispatchToPropsType = {
  getCurrencyRate: (сurrency: CurrencyType) => Promise<void>,
};

type OwnProps = {};

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnProps;

const CurrencyContainer: React.FC<PropsType> = ({
  currentCountryData, currencyRate,
  currentButtonsLocalisation, getCurrencyRate,
}: PropsType) => {
  const currentCurrency = currentCountryData
    && currentCountryData.currency;

  useEffect(() => {
    getCurrencyRate(currentCurrency);
  }, [currentCurrency]);

  return (
    <div className="widget">
      <Currency
        currencyRate={currencyRate}
        currentCurrency={currentCurrency}
        currentButtonsLocalisation={currentButtonsLocalisation}
      />
    </div>
  );
};

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  currencyRate: state.widgets.currencyRate,
  currentButtonsLocalisation: state.localisation.currentButtonsLocalisation,
  currentCountryData: state.countries.currentCountryData,
});

export default connect(mapStateToProps, { getCurrencyRate })(CurrencyContainer);
