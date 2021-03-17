import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  AppBar, Container, Toolbar, Typography, Box,
} from '@material-ui/core';
import Button from '@material-ui/core/Button';
import SearchForm from './SearchForm';

const Header: React.FC = () => (
  <AppBar position="fixed">
    <Container fixed>
      <Toolbar className="header">
        <Typography variant="h6">
          <NavLink to="/">Travel app</NavLink>
        </Typography>
        <SearchForm />
        <Button variant="contained">Change language</Button>
        <Box mr={3}>
          <Button color="inherit" variant="outlined">Log In</Button>
          <Button color="secondary" variant="contained">Sign Up</Button>
        </Box>
      </Toolbar>
    </Container>
  </AppBar>
);

export default Header;
