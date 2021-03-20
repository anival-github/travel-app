import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import currencyAPI from '../api/currency-api';
import weatherAPI from '../api/weather-api';
import { CurrencyType } from '../types/currency-types';
import { AppStateType } from './store';

const SET_WEATHER_DATA = 'travel-app/widgets/SET_WEATHER_DATA';
const SET_CURRENCY_RATE = 'travel-app/widgets/SET_CURRENCY_RATE';

const InitialState = {
  weatherData: null as any,
  currencyRate: null as any,
  currentCurrency: null as null | CurrencyType,
};

type InitialStateType = typeof InitialState;

type ActionsType = SetWeatherDataType | SetCurrencyRateType;

const widgetsReducer = (state = InitialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case SET_WEATHER_DATA:
      return {
        ...state,
        weatherData: action.data,
      };
    case SET_CURRENCY_RATE:
      return {
        ...state,
        currencyRate: action.currencyRate,
      };
    default:
      return state;
  }
};

type SetWeatherDataType = {
  type: typeof SET_WEATHER_DATA,
  data: any,
};

export const setWeatherData = (data: any): SetWeatherDataType => ({
  type: SET_WEATHER_DATA,
  data,
});

type DispatchType = Dispatch <ActionsType>;
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const getWeather = (city: string): ThunkType => async (
  dispatch: DispatchType,
): Promise<void> => {
  const data = await weatherAPI.getWeather(city);
  dispatch(setWeatherData(data));
};

type SetCurrencyRateType = {
  type: typeof SET_CURRENCY_RATE,
  currencyRate: any,
};

const setCurrencyRate = (currencyRate: any): SetCurrencyRateType => ({
  type: SET_CURRENCY_RATE,
  currencyRate,
});

export const getCurrencyRate = (currentCurrency: CurrencyType): ThunkType => async (
  dispatch: DispatchType,
): Promise<void> => {
  const EURBasedRate = await currencyAPI.getRate(currentCurrency);

  const currentCurrencyBasedRate = {
    USD: EURBasedRate.USD / EURBasedRate[currentCurrency],
    EUR: EURBasedRate.EUR / EURBasedRate[currentCurrency],
    BYN: EURBasedRate.BYN / EURBasedRate[currentCurrency],
  };

  dispatch(setCurrencyRate(currentCurrencyBasedRate));
};

export default widgetsReducer;
