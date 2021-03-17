import React, {
  FC, CSSProperties, useRef, useState,
} from 'react';
import TextField from '@material-ui/core/TextField';
import {
  Grid, Button, LinearProgress, Avatar,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import useTypedSelector from '../../redux/reducers/hooks/useTypedSelector';
import { userRegistration } from '../../redux/reducers/UserStateReduser';

async function setAvatarhandler(e:any, calllback: Function) {
  const file = e.target.files[0];
  const reader = new FileReader();
  reader.onload = async () => {
    calllback(reader.result);
  };
  reader.readAsDataURL(file);
}

const Signup: FC = () => {
  const userState = useTypedSelector((state) => state.userState);
  const styleCss: CSSProperties = {
    marginTop: '100px',
    height: '100%',
  };
  const [avatarSrc, setavatarSrc] = useState('');
  const dispatch = useDispatch();
  const form = useRef<HTMLFormElement>(null);
  return (

    <div style={styleCss}>
      {userState.isLoged && <Redirect to="/" /> }
      <form
        ref={form}
        name="registrationForm"
        noValidate={false}
        autoComplete="off"
        action="#"
        onSubmit={async (e) => {
          e.preventDefault();
          if (form.current) {
            const formdata = new FormData(form.current);
            dispatch(userRegistration(formdata));
          }
        }}
      >
        <Grid container direction="column" justify="center" alignItems="center">
          {userState.queryStatus.isSuccessful
            ? <Alert severity="info">Enter registration data</Alert>
            : <Alert severity="warning">Login or email alredy taken</Alert>}
          <Avatar alt="" src={avatarSrc} style={{ width: '180px', height: '180px' }} />
          <label htmlFor="contained-button-file">
            <input
              name="avatar"
              accept="image/*"
              id="contained-button-file"
              type="file"
              style={{ display: 'none' }}
              onChange={(e) => setAvatarhandler(e, setavatarSrc)}
            />

            <Button variant="contained" component="span">
              Chose avatar
            </Button>
          </label>
          <TextField style={{ marginTop: '10px' }} id="outlined-basic" variant="filled" label="Name" name="name" />
          <TextField style={{ marginTop: '10px' }} id="outlined-basic" variant="filled" label="Login" required name="login" />
          <TextField style={{ marginTop: '10px' }} id="outlined-basic" variant="filled" label="Email" type="email" required name="email" />
          <TextField style={{ marginTop: '10px' }} id="outlined-basic" variant="filled" label="Password" required name="password" />
          {/* {userState.queryStatus.isPending && <LinearProgress /> } */}
          <Grid container direction="row" justify="center" alignItems="center" style={{ marginTop: '10px' }}>
            {userState.queryStatus.isPending && <LinearProgress /> }
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Register
            </Button>
            <Button variant="contained" color="secondary">
              Cancel
            </Button>

          </Grid>
        </Grid>
      </form>
    </div>
  );
};

export default Signup;
