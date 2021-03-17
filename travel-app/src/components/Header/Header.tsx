import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar, Container, Toolbar, Typography, Box,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SearchForm from './SearchForm';
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
          <Button variant="contained">Change language</Button>
          <Box mr={3}>
            {userState.isLoged
              ? <h1>{userState.user?.login}</h1>
              : (
                <>
                  <Button color="inherit" variant="outlined">Log In</Button>
                  <Button color="secondary" variant="contained" href="/signup">Sign Up</Button>
                </>
              )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>

  );
};

export default Header;
