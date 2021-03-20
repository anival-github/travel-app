import { ThunkAction } from 'redux-thunk';
import { AppStateType } from './store';

const SET_CURRENT_LANGUAGE = 'travel-app/localisation/SET_CURRENT_LANGUAGE';
const SET_CURRENT_BUTTONS_LOCALISATION = 'travel-app/localisation/SET_CURRENT_BUTTONS_LOCALISATION';

export type LanguageType = 'ru-RU' | 'en-US' | 'de-DE';

export type ButtonsType = {
  findCoutry: string,
  logIn: string,
  signUp: string,
  language: string,
  view: string,

  logout: string;
  close: string;
  userMenu: string;

  currency: string,
  exchangeRates: string,
  temperature: string,
  weatherDescription: string,
  humidity: string,

};

export type ButtonsLocalisationType = {
  lang: LanguageType,
  buttons: ButtonsType,
};

const buttonsLocalisations: Array<ButtonsLocalisationType> = [
  {
    lang: 'ru-RU',
    buttons: {
      findCoutry: 'Найти страну',
      logIn: 'Войти',
      signUp: 'Зарегистрироваться',
      language: 'язык',
      view: 'Подробнее',

      logout: 'Выход',
      close: 'Закрыть',
      userMenu: 'Меню',

      currency: 'Местная валюта',
      exchangeRates: 'Курс обмена',
      temperature: 'Температура',
      weatherDescription: 'Описание',
      humidity: 'Влажность',

    },
  },
  {
    lang: 'en-US',
    buttons: {
      findCoutry: 'Find a country',
      logIn: 'Log in',
      signUp: 'Sign up',
      language: 'language',
      view: 'View',

      logout: 'Logout',
      close: 'Close',
      userMenu: 'Menu',

      currency: 'Currency',
      exchangeRates: 'Exchange rates',
      temperature: 'Temperature',
      weatherDescription: 'Description',
      humidity: 'Humidity',

    },
  },
  {
    lang: 'de-DE',
    buttons: {
      findCoutry: 'Аinde ein land',
      logIn: 'Log in',
      signUp: 'Sign up',
      language: 'sprachen',
      view: 'Aussicht',

      logout: 'Logout',
      close: 'Hinausgehen',
      userMenu: 'Speisekarte',

      currency: 'Währung',
      exchangeRates: 'Wechselkurse',
      temperature: 'Temperatur',
      weatherDescription: 'Beschreibung',
      humidity: 'Luftfeuchtigkeit',

    },
  },
];

const InitialState = {
  languagesAvailable: ['ru-RU', 'en-US', 'de-DE'] as Array<LanguageType>,
  currentLanguage: 'ru-RU' as LanguageType,
  buttonsLocalisations: buttonsLocalisations as Array<ButtonsLocalisationType>,
  currentButtonsLocalisation: buttonsLocalisations[0] as ButtonsLocalisationType,
};

type InitialStateType = typeof InitialState;

type ActionsType =
  | SetCurrentLanguageType
  | SetCurrentButtonsLocalisationType;

const localisationReducer = (state = InitialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case SET_CURRENT_LANGUAGE:
      return {
        ...state,
        currentLanguage: action.language,
      };
    case SET_CURRENT_BUTTONS_LOCALISATION:
      return {
        ...state,
        currentButtonsLocalisation: action.currentButtonsLocalisation,
      };
    default:
      return state;
  }
};

export type SetCurrentLanguageType = {
  type: typeof SET_CURRENT_LANGUAGE,
  language: LanguageType,
};

export const setCurrentLanguage = (language: LanguageType): SetCurrentLanguageType => ({
  type: SET_CURRENT_LANGUAGE,
  language,
});

export type SetCurrentButtonsLocalisationType = {
  type: typeof SET_CURRENT_BUTTONS_LOCALISATION,
  currentButtonsLocalisation: ButtonsLocalisationType,
};

export const setCurrentButtonsLocalisation = (
  currentButtonsLocalisation: ButtonsLocalisationType,
): SetCurrentButtonsLocalisationType => ({
  type: SET_CURRENT_BUTTONS_LOCALISATION,
  currentButtonsLocalisation,
});

export type ThunkType = ThunkAction<Promise<void>, AppStateType, unknown, ActionsType>;

export const changeLanguage = (
  language: LanguageType,
): ThunkType => async (dispatch, getState): Promise<void> => {
  dispatch(setCurrentLanguage(language));

  const { buttonsLocalisations } = getState().localisation;

  const currentButtonsLocalisation = buttonsLocalisations.find(
    (localisation) => localisation.lang === language,
  );

  if (!currentButtonsLocalisation) {
    throw new Error('There is no localisation for this language');
  }

  dispatch(setCurrentButtonsLocalisation(currentButtonsLocalisation));
};

export default localisationReducer;
