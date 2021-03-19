const SET_IS_COUNTRYPAGE_OPENED = 'travel-app/app/DEFINE_IS_COUNTRYPAGE_OPENED';

const InitialState = {
  isCountryPageOpened: false,
};

type InitialStateType = typeof InitialState;

type ActionsType = SetIsCountryPageOpenedType;

const appReducer = (state = InitialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case SET_IS_COUNTRYPAGE_OPENED:
      return {
        ...state,
        isCountryPageOpened: action.isCountryPageOpened,
      };
    default:
      return state;
  }
};

export type SetIsCountryPageOpenedType = {
  type: typeof SET_IS_COUNTRYPAGE_OPENED,
  isCountryPageOpened: boolean,
};

export const setIsCountryPageOpened = (
  isCountryPageOpened: boolean,
): SetIsCountryPageOpenedType => ({
  type: SET_IS_COUNTRYPAGE_OPENED,
  isCountryPageOpened,
});

export default appReducer;
