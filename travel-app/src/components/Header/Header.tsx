import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar, Container, Toolbar, Typography, Box,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { connect } from 'react-redux';
import SearchForm from './SearchForm';
import SelectLanguage from './SelectLanguage';
import useTypedSelector from '../../redux/reducers/hooks/useTypedSelector';
import { AppStateType } from '../../redux/store';
import {
  setCurrentLanguage, LanguageType, SetCurrentLanguageType, ButtonsLocalisationType,
} from '../../redux/localisation-reducer';

import User from '../Authorization/User';

type MapStateToPropsType = {
  currentLanguage: LanguageType,
  languagesAvailable: Array<LanguageType>,
  isCountryPageOpened: boolean,
};

type MapDispatchToPropsType = {
  setCurrentLanguage: (language: LanguageType) => SetCurrentLanguageType,
};

type OwnPropsType = {
  currentButtonsLocalosation: ButtonsLocalisationType,
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnPropsType;

const Header: React.FC<PropsType> = ({
  languagesAvailable, currentLanguage, currentButtonsLocalosation,
  isCountryPageOpened, setCurrentLanguage,
}: PropsType) => {
  const userState = useTypedSelector((state) => state.userState);

  const buttonsNames = currentButtonsLocalosation.buttons;

  const { logIn, signUp } = buttonsNames;

  return (

    <AppBar position="sticky">
      <Container fixed>
        <Toolbar className="header">
          <Typography variant="h6">
            <NavLink to="/">Travel app</NavLink>
          </Typography>
          {
            !isCountryPageOpened
            && <SearchForm buttonsNames={buttonsNames} />
          }
          <Box mr={3}>
            {userState.isLoged
              ? (
                <User
                  userLogin={userState.user?.login as string}
                  avatarSrc={userState.user?.imgSecureUrl as string}
                />
              )
              : (
                <>
                  <Button color="inherit" variant="outlined" href="/login">{logIn}</Button>
                  <Button color="secondary" variant="contained" href="/signup">{signUp}</Button>
                </>
              )}
          </Box>
          <SelectLanguage
            languagesAvailable={languagesAvailable}
            currentLanguage={currentLanguage}
            setCurrentLanguage={setCurrentLanguage}
            buttonsNames={buttonsNames}
          />
        </Toolbar>
      </Container>
    </AppBar>

  );
};

const MapStateToProps = (state: AppStateType) => ({
  currentLanguage: state.localisation.currentLanguage,
  languagesAvailable: state.localisation.languagesAvailable,
  isCountryPageOpened: state.app.isCountryPageOpened,
});

export default connect(MapStateToProps, { setCurrentLanguage })(Header);
