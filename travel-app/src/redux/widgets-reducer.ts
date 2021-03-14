import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import weatherAPI from '../api/weather-api';
import { AppStateType } from './store';

const SET_WEATHER_DATA = 'travel-app/widgets/SET_WEATHER_DATA';

const InitialState = {
  weatherData: null as any,
};

type InitialStateType = typeof InitialState;

type ActionsType = SetWeatherDataType;

const widgetsReducer = (state = InitialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case SET_WEATHER_DATA:
      return {
        ...state,
        weatherData: action.data,
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

export default widgetsReducer;
