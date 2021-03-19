const SET_CURRENT_LANGUAGE = 'travel-app/app/SET_CURRENT_LANGUAGE';

export type LanguageType = 'ru-RU' | 'en-US' | 'de-DE';

export type ButtonsType = {
  findCoutry: string,
  logIn: string,
  signUp: string,
  language: string,
  view: string,
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
    },
  },
];

const InitialState = {
  languagesAvailable: ['ru-RU', 'en-US', 'de-DE'] as Array<LanguageType>,
  currentLanguage: 'ru-RU' as LanguageType,
  buttonsLocalisations,
};

type InitialStateType = typeof InitialState;

type ActionsType = SetCurrentLanguageType;

const localisationReducer = (state = InitialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case SET_CURRENT_LANGUAGE:
      return {
        ...state,
        currentLanguage: action.language,
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

export default localisationReducer;
