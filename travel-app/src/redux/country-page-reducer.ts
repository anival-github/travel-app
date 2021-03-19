import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { getallbycountry } from '../api/ServerAPI/Places';
import { getAllReviewsByPlaceId } from '../api/ServerAPI/Reviews';
import { AppStateType } from './store';

const SET_ALL_PLACES_DATA = 'travel-app/countries/SET_ALL_PLACES_DATA';
const SET_PLACE_REVIEWS_DATA = 'travel-app/countries/SET_PLACE_REVIEWS_DATA';

const InitialState = {
  allPlacesData: null as any,
  placeReviewsData: null as any,
};

type InitialStateType = typeof InitialState;

type ActionsType = SetAllPLacesDataType | SetPlaceReviewType;

const countryPlacesReducer = (state = InitialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case SET_ALL_PLACES_DATA:
      return {
        ...state,
        allPlacesData: action.data,
      };
    case SET_PLACE_REVIEWS_DATA:
      return {
        ...state,
        placeReviewsData: action.data,
      };
    default:
      return state;
  }
};

type SetAllPLacesDataType = {
  type: string,
  data: any,
};

type SetPlaceReviewType = {
  type: string,
  data: any,
};

export const SetAllPlacesData = (data: any): SetAllPLacesDataType => ({
  type: SET_ALL_PLACES_DATA,
  data,
});

export const SetPlaceReviewData = (data: any): SetPlaceReviewType => ({
  type: SET_PLACE_REVIEWS_DATA,
  data,
});

type DispatchType = Dispatch <ActionsType>;
export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const getAllPlacesData = (ISOCode: string): ThunkType => async (
  dispatch: DispatchType,
): Promise<void> => {
  const data = await getallbycountry(ISOCode);
  dispatch(SetAllPlacesData(data));
};

export const getPlaceReviewData = (id: string): ThunkType => async (
  dispatch: DispatchType,
): Promise<void> => {
  const data = await getAllReviewsByPlaceId(id);
  dispatch(SetPlaceReviewData(data));
};

export default countryPlacesReducer;
