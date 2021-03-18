const TEST = 'travel-app/app/TEST';

export type LanguageType = 'ru-RU' | 'en-US' | 'de-DE';

const InitialState = {
  languagesAvailable: ['ru-RU', 'en-US', 'de-DE'] as Array<LanguageType>,
  currentLanguage: 'ru-RU' as LanguageType,
};

type InitialStateType = typeof InitialState;

type ActionsType = SetCurrentLanguageType;

const appReducer = (state = InitialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case TEST:
      return {
        ...state,
        currentLanguage: action.language,
      };
    default:
      return state;
  }
};

export type SetCurrentLanguageType = {
  type: typeof TEST,
  language: LanguageType,
};

export const setCurrentLanguage = (language: LanguageType): SetCurrentLanguageType => ({
  type: TEST,
  language,
});

export default appReducer;
