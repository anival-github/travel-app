import { CurrencyType } from '../types/currency-types';

const API_ACCESS_KEY = '3f9155529fc4d101ee02a7258741580e';

const currencyAPI = {
  async getRate(сurrency: CurrencyType) {
    const URL = `http://data.fixer.io/api/latest?access_key=${API_ACCESS_KEY}&symbols=USD,EUR,BYN,${сurrency}&format=1`;
    const res = await fetch(URL);
    const data = await res.json();
    return data.rates;
  },
};

export default currencyAPI;
