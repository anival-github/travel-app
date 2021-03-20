import { Dispatch } from 'react';
import { ThunkAction } from 'redux-thunk';
import { getallbycountry } from '../api/ServerAPI/Places';
import {
  deleteReviewById, getAllReviewsByPlaceId, insertReview, updateReviewById,
} from '../api/ServerAPI/Reviews';
import { AppStateType } from './store';

const SET_ALL_PLACES_DATA = 'travel-app/countries/SET_ALL_PLACES_DATA';
const SET_PLACE_REVIEWS_DATA = 'travel-app/countries/SET_PLACE_REVIEWS_DATA';
const PUT_PLACE_REVIEW_DATA = 'travel-app/countries/PUT_PLACE_REVIEW_DATA';
const REMOVE_PLACE_REVIEW = 'travel-app/countries/REMOVE_PLACE_REVIEW';
const EDIT_PLACE_REVIEW = 'travel-app/countries/EDIT_PLACE_REVIEW';

const InitialState = {
  allPlacesData: null as any,
  placeReviewsData: null as any,
};

type InitialStateType = typeof InitialState;

type ActionsType = SetAllPLacesDataType
& SetPlaceReviewType
& PutPlaceReviewType
& RemovePlaceReviewType
& UpdatePlaceReviewType;

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
    case PUT_PLACE_REVIEW_DATA:
      return {
        ...state,
        placeReviewsData: [...state.placeReviewsData, action.data],
      };
    case REMOVE_PLACE_REVIEW:
      return {
        ...state,
        // eslint-disable-next-line no-underscore-dangle
        placeReviewsData: state.placeReviewsData.filter((i: any) => i._id !== action.data),
      };
    case EDIT_PLACE_REVIEW:
      return {
        ...state,
        placeReviewsData: state.placeReviewsData.map((i: any) => {
          // eslint-disable-next-line no-underscore-dangle
          if (i._id === action.data.reviewId) {
            return { ...i, ...action.data.updateFields };
          } return i;
        }),
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

type PutPlaceReviewType = {
  type: string,
  data: any,
};

type RemovePlaceReviewType = {
  type: string,
  data: string,
};

type UpdatePlaceReviewType = {
  type: string,
  data: string,
};

export const SetAllPlacesData = (data: any): SetAllPLacesDataType => ({
  type: SET_ALL_PLACES_DATA,
  data,
});

export const SetPlaceReviewData = (data: any): SetPlaceReviewType => ({
  type: SET_PLACE_REVIEWS_DATA,
  data,
});

export const PutPlaceReviewData = (data: any): PutPlaceReviewType => ({
  type: PUT_PLACE_REVIEW_DATA,
  data,
});

export const RemovePlaceReviewData = (data: any): RemovePlaceReviewType => ({
  type: REMOVE_PLACE_REVIEW,
  data,
});

export const EditPlaceReviewData = (data: any): UpdatePlaceReviewType => ({
  type: EDIT_PLACE_REVIEW,
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

export const putPlaceReviewDataThunk = (data: any, token: string): ThunkType => async (
  dispatch: DispatchType,
): Promise<void> => {
  dispatch(PutPlaceReviewData(data));
  insertReview(data, token);
};

export const deletePlaceReviewData = (data: string, token: string): ThunkType => async (
  dispatch: DispatchType,
): Promise<void> => {
  dispatch(RemovePlaceReviewData(data));
  deleteReviewById(data, token);
};

export const editPlaceReviewData = (data: any): ThunkType => async (
  dispatch: DispatchType,
): Promise<void> => {
  dispatch(EditPlaceReviewData(data));
  updateReviewById(data);
};

export default countryPlacesReducer;
