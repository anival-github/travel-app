import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar, Container, Toolbar, Typography,
} from '@material-ui/core';

import { connect } from 'react-redux';
import SearchForm from './SearchForm';
import SelectLanguage from './SelectLanguage';

import { AppStateType } from '../../redux/store';
import {
  changeLanguage, LanguageType, ButtonsLocalisationType,
} from '../../redux/localisation-reducer';

import User from '../Authorization/User';

type MapStateToPropsType = {
  currentLanguage: LanguageType,
  languagesAvailable: Array<LanguageType>,
  isCountryPageOpened: boolean,
  currentButtonsLocalisation: ButtonsLocalisationType,
};

type MapDispatchToPropsType = {
  changeLanguage: (language: LanguageType) => Promise<void>,
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType;

const Header: React.FC<PropsType> = ({
  languagesAvailable, currentLanguage, currentButtonsLocalisation,
  isCountryPageOpened, changeLanguage,
}: PropsType) => {
  // const userState = useTypedSelector((state) => state.userState);

  const buttonsNames = currentButtonsLocalisation.buttons;

  // const { logIn, signUp } = buttonsNames;

  return (

    <AppBar position="sticky">
      <Container fixed>
        <Toolbar
          className="header"
          // style={{
          //   display: 'flex',
          //   justifyContent: 'space-between',
          //   alignItems: 'center',
          //   flexFlow: 'row wrap',
          //   padding: '0',
          // }}
        >
          <Typography variant="h6">
            <NavLink to="/">Travel app</NavLink>
          </Typography>
          {
            !isCountryPageOpened
            && <SearchForm buttonsNames={buttonsNames} />
          }
          {/* <Box mr={3}>
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
          </Box> */}
          <SelectLanguage
            languagesAvailable={languagesAvailable}
            currentLanguage={currentLanguage}
            changeLanguage={changeLanguage}
            buttonsNames={buttonsNames}
          />
          <User buttonsNames={currentButtonsLocalosation} />
        </Toolbar>
      </Container>
    </AppBar>

  );
};

const MapStateToProps = (state: AppStateType) => ({
  currentLanguage: state.localisation.currentLanguage,
  languagesAvailable: state.localisation.languagesAvailable,
  isCountryPageOpened: state.app.isCountryPageOpened,
  currentButtonsLocalisation: state.localisation.currentButtonsLocalisation,
});

export default connect(MapStateToProps, { changeLanguage })(Header);
