import React, { Fragment } from 'react';
import { useDispatch } from 'react-redux';
import {
  Button, Menu, MenuItem, Avatar, Grid,
} from '@material-ui/core';
import { userLogOut } from '../../redux/reducers/UserStateReduser';

type Props = {
  userLogin: string;
  avatarSrc: string;
};

function User({ userLogin, avatarSrc }: Props) {
  const [anchorEl, setAnchorEl] = React.useState(null);
  const dispatch = useDispatch();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogOut = (e: any) => {
    const aaa = e.target;
    switch (aaa.innerText) {
      case 'Logout':
        dispatch(userLogOut(userLogin));
        break;
      default:
        break;
    }
  };
  return (
    <>
      <Grid container direction="row" justify="center" alignItems="center">
        <Button
          variant="contained"
          aria-controls="simple-menu"
          aria-haspopup="true"
          onClick={handleClick}
        >
          {userLogin}
        </Button>
        <Menu
          id="simple-menu"
          anchorEl={anchorEl}
          keepMounted
          open={Boolean(anchorEl)}
          onClick={handleLogOut}
        >
          <MenuItem onClick={handleClose}>Logout</MenuItem>
          <MenuItem onClick={handleClose}>Close</MenuItem>
        </Menu>
        <Avatar
          alt=""
          src={avatarSrc}
          style={{ width: '50px', height: '50px' }}
        />
      </Grid>
    </>
  );
}

export default User;
