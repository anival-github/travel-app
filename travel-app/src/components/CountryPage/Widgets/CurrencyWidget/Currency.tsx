import React from 'react';
import { CurrencyType } from '../../../../types/currency-types';

type PropsType = {
  currencyRate: any,
  currentCurrency: CurrencyType,
};

const Currency: React.FC<PropsType> = ({
  currencyRate, currentCurrency,
}: PropsType) => {
  const ratesElements = currencyRate
    && Object.entries(currencyRate).map(
      (rate) => {
        const currencyName = rate[0];
        const currencyRate: any = rate[1];
        const currencyRateToFixed = currencyRate.toFixed(3);
        return (
          <div>
            <span>
              {`${currencyName}: ${currencyRateToFixed}`}
            </span>
          </div>
        );
      },
    );

  return (
    <div>
      <p>
        {`Exchange rates for: ${currentCurrency}`}
      </p>
      <p>{ratesElements}</p>
    </div>
  );
};

export default Currency;
