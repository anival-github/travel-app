import { ThunkAction } from 'redux-thunk';
import { getAllCountries } from '../api/ServerAPI/Countries';
import { AppStateType } from './store';

const SET_CURRENT_COUNTRY_CODE = 'travel-app/countries/SET_CURRENT_COUNTRY_CODE';
const SET_ALL_COUNTRIES_DATA = 'travel-app/countries/SET_ALL_COUNTRIES_DATA';
const SET_CURRENT_COUNTRY_DATA = 'travel-app/countries/SET_CURRENT_COUNTRY_DATA';

export type CountriesISOCodesType = 'BLR' | 'RUS' | 'FR' | 'SPN' | 'GBR' | 'NL' | 'UA' | 'IT';

const InitialState = {
  currentCountryISOCode: null as null | CountriesISOCodesType,
  allCountriesData: null as any,
  currentCountryData: null as any,
};

type InitialStateType = typeof InitialState;

type ActionsType =
  | SetCurrentCountryCodeType
  | SetAllCountriesDataType
  | SetCurrentCountryDataType;

const countriesReducer = (state = InitialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case SET_ALL_COUNTRIES_DATA:
      return {
        ...state,
        allCountriesData: action.data,
      };
    case SET_CURRENT_COUNTRY_CODE:
      return {
        ...state,
        currentCountryISOCode: action.ISOCode,
      };
    case SET_CURRENT_COUNTRY_DATA:
      return {
        ...state,
        currentCountryData: action.currentCountryData,
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

export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const getAllCoutriesData = (): ThunkType => async (dispatch): Promise<void> => {
  const data = await getAllCountries();
  dispatch(setAllCountriesData(data));
};

export type SetCurrentCountryCodeType = {
  type: typeof SET_CURRENT_COUNTRY_CODE,
  ISOCode: CountriesISOCodesType,
};

export const setCurrentCountryCode = (
  ISOCode: CountriesISOCodesType,
): SetCurrentCountryCodeType => ({
  type: SET_CURRENT_COUNTRY_CODE,
  ISOCode,
});

export type SetCurrentCountryDataType = {
  type: typeof SET_CURRENT_COUNTRY_DATA,
  currentCountryData: any,
};

export const setCurrentCountryData = (
  currentCountryData: any,
): SetCurrentCountryDataType => ({
  type: SET_CURRENT_COUNTRY_DATA,
  currentCountryData,
});

export const chooseCountry = (
  ISOCode: CountriesISOCodesType,
): ThunkType => async (dispatch, getState): Promise<void> => {
  dispatch(setCurrentCountryCode(ISOCode));

  const { allCountriesData } = getState().countries;

  const currentCountryData = allCountriesData.find(
    (country: any) => country.ISOCode === ISOCode,
  );

  dispatch(setCurrentCountryData(currentCountryData));
};

export default countriesReducer;
