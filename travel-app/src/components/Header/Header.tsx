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
import useTypedSelector from '../../redux/reducers/hooks/useTypedSelector';

const Header: React.FC = () => {
  const userState = useTypedSelector((state) => state.userState);
  return (
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

                {userState.isLoged
                  ? <h1>{userState.user?.login}</h1>
                  : (
                    <>
                      <Button color="inherit" variant="outlined">Log In</Button>
                      <Button color="secondary" variant="contained" href="/signup">Sign Up</Button>
                    </>
                  )}
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
};

export default Header;
