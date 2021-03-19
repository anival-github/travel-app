import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { getAllCountries } from '../api/ServerAPI/Countries';
import { AppStateType } from './store';

const SET_ALL_COUNTRIES_DATA = 'travel-app/countries/SET_ALL_COUNTRIES_DATA';
const SET_CURRENT_COUNTRY = 'travel-app/countries/SET_CURRENT_COUNTRY';

type CountryesISOCodesType = 'BLR' | 'RUS' | 'FR' | 'SPN' | 'GBR' | 'NL' | 'UA' | 'IT';

const InitialState = {
  allCountriesData: null as any,
  currentCountryISOCode: null as null | CountryesISOCodesType,
};

type InitialStateType = typeof InitialState;

type ActionsType = SetAllCountriesDataType | SetCurrentCountryType;

const countriesReducer = (state = InitialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case SET_ALL_COUNTRIES_DATA:
      return {
        ...state,
        allCountriesData: action.data,
      };
    case SET_CURRENT_COUNTRY:
      return {
        ...state,
        currentCountryISOCode: action.ISOCode,
      };
    default:
      return state;
  }
};

type SetAllCountriesDataType = {
  type: typeof SET_ALL_COUNTRIES_DATA,
  data: any,
};

export const setAllCountriesData = (data: any): SetAllCountriesDataType => ({
  type: SET_ALL_COUNTRIES_DATA,
  data,
});

type DispatchType = Dispatch <ActionsType>;
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const getAllCoutriesData = (): ThunkType => async (
  dispatch: DispatchType,
): Promise<void> => {
  const data = await getAllCountries();
  dispatch(setAllCountriesData(data));
};

export type SetCurrentCountryType = {
  type: typeof SET_CURRENT_COUNTRY,
  ISOCode: CountryesISOCodesType,
};

export const setCurrentCountryType = (ISOCode: CountryesISOCodesType) => ({
  type: SET_CURRENT_COUNTRY,
  ISOCode,
});

export default countriesReducer;
