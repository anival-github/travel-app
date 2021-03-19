/* eslint-disable import/no-cycle */
import {
  applyMiddleware, combineReducers, createStore, compose,
} from 'redux';
import thunkMiddleWare from 'redux-thunk';
import appReducer from './app-reducer';
import countriesReducer from './countries-reducer';
import searchReducer from './search-reducer';
import widgetsReducer from './widgets-reducer';
import { UserStateReduser } from './reducers/UserStateReduser';
import countryPlacesReducer from './country-page-reducer';
import localisationReducer from './localisation-reducer';

export const rootReducer = combineReducers({
  app: appReducer,
  widgets: widgetsReducer,

  countries: countriesReducer,
  search: searchReducer,
  localisation: localisationReducer,

  userState: UserStateReduser,
  places: countryPlacesReducer,
});

type RootReducerType = typeof rootReducer;
export type AppStateType = ReturnType<RootReducerType>;

// @ts-ignore
const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store = createStore(rootReducer, composeEnhancers(applyMiddleware(thunkMiddleWare)));

export default store;
