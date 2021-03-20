import React from 'react';
import { ButtonsLocalisationType } from '../../../../redux/localisation-reducer';
import { CurrencyType } from '../../../../types/currency-types';

type PropsType = {
  currencyRate: any,
  currentCurrency: CurrencyType,
  currentButtonsLocalisation: ButtonsLocalisationType,
};

const Currency: React.FC<PropsType> = ({
  currencyRate,
  currentCurrency,
  currentButtonsLocalisation,
}: PropsType) => {
  const { exchangeRates, currency } = currentButtonsLocalisation.buttons;

  const ratesElements = currencyRate
    && Object.entries(currencyRate).map(
      (rate) => {
        const currencyName = rate[0];
        const currencyRate: any = rate[1];
        const currencyRateToFixed = currencyRate.toFixed(3);
        return (
          <div key={currencyName}>
            <span>
              {`${currencyName}: ${currencyRateToFixed}`}
            </span>
          </div>
        );
      },
    );

  return (
    <div>
      <span>{`${currency}: ${currentCurrency}`}</span>
      <div>{`${exchangeRates}:`}</div>
      <div>{ratesElements}</div>
    </div>
  );
};

export default Currency;
