import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar, Container, Toolbar, Typography, Box,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SearchForm from './SearchForm';
import ControlledOpenSelect from './select';
import useTypedSelector from '../../redux/reducers/hooks/useTypedSelector';

const Header: React.FC = () => {
  const userState = useTypedSelector((state) => state.userState);
  return (

    <AppBar position="fixed">
      <Container fixed>
        <Toolbar className="header">
          <Typography variant="h6">
            <NavLink to="/">Travel app</NavLink>
          </Typography>
          <SearchForm />
          <Box mr={3}>
            {userState.isLoged
              ? <h1>{userState.user?.login}</h1>
              : (
                <>
                  <Button color="inherit" variant="outlined" href="/login">Log In</Button>
                  <Button color="secondary" variant="contained" href="/signup">Sign Up</Button>
                </>
              )}
          </Box>
          <ControlledOpenSelect />
        </Toolbar>
      </Container>
    </AppBar>

  );
};

export default Header;
