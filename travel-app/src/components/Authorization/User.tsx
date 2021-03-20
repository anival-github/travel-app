import React from 'react';
import { useDispatch } from 'react-redux';
import {
  Button, Menu, MenuItem, Avatar, Grid, Box,
} from '@material-ui/core';
import { userLogOut } from '../../redux/reducers/UserStateReduser';
import useTypedSelector from '../../redux/reducers/hooks/useTypedSelector';
import { ButtonsLocalisationType } from '../../redux/localisation-reducer';

type Props = {
  buttonsNames: ButtonsLocalisationType;
};

function User({ buttonsNames }: Props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();
  const userState = useTypedSelector((state) => state.userState);
  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = (e: any) => {
    const menuItem = e.target;
    switch (menuItem.innerText) {
      case buttonsNames.buttons.logout:
        dispatch(userLogOut(userState.user?.login as string));
        break;

      default:
        break;
    }
  };
  return (
    <Box mr={3}>
      <Grid container direction="row" justify="center" alignItems="center">
        <Button
          variant="contained"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          {userState.isLoged ? userState.user?.login as string : buttonsNames.buttons.userMenu}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClick={handleLogOut}
        >
          {userState.isLoged && (
          <MenuItem onClick={handleClose}>{buttonsNames.buttons.logout}</MenuItem>)}
          {userState.isLoged || (
          <MenuItem onClick={handleClose}>
            {' '}
            <a className="UserMenuItemRef" href="/login">{buttonsNames.buttons.logIn}</a>
          </MenuItem>
          )}
          {userState.isLoged || <MenuItem onClick={handleClose}><a className="UserMenuItemRef" href="/signup">{buttonsNames.buttons.signUp}</a></MenuItem>}
          <MenuItem onClick={handleClose}>{buttonsNames.buttons.close}</MenuItem>
        </Menu>
        <Avatar
          alt=""
          src={userState.user?.imgSecureUrl}
          style={{ width: '50px', height: '50px' }}
        />
      </Grid>
    </Box>
  );
}

export default User;
