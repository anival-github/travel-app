import React from 'react';
import { Link } from 'react-router-dom';
import {
  AppBar,
  Container,
  Toolbar,
  Typography,
  Box,
} from '@material-ui/core';
import TextField from '@material-ui/core/TextField';
import Button from '@material-ui/core/Button';

const Header: React.FC = () => (
  <div>
    <AppBar position="fixed">
      <Container fixed>
        <Toolbar className="header">
          <Typography variant="h6">Travel app</Typography>

          <form
            noValidate
            autoComplete="off"
          >
            <TextField id="outlined-basic" label="Change country" variant="outlined" />
          </form>
          <div>
            <Box mr={3}>
              <Button color="inherit" variant="outlined">Log In</Button>
              <Button color="secondary" variant="contained">Sign Up</Button>
            </Box>
            <Button variant="contained">Change language</Button>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
    <Link to="/">Home</Link>
    <Link to="/country">Country</Link>
  </div>
);

export default Header;
