import React, {
  FC, CSSProperties, useRef,
} from 'react';
import TextField from '@material-ui/core/TextField';
import {
  Grid, Button, LinearProgress,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import useTypedSelector from '../../redux/reducers/hooks/useTypedSelector';
import { userLogin } from '../../redux/reducers/UserStateReduser';

const Login: FC = () => {
  const userState = useTypedSelector((state) => state.userState);
  const styleCss: CSSProperties = {
    marginTop: '100px',
    height: '100%',
  };
  const dispatch = useDispatch();
  const form = useRef<HTMLFormElement>(null);
  return (

    <div style={styleCss}>
      {userState.isLoged && <Redirect to="/" /> }
      <form
        ref={form}
        name="loginForm"
        noValidate={false}
        autoComplete="off"
        action="#"
        onSubmit={async (e) => {
          e.preventDefault();
          if (form.current) {
            const formdata = new FormData(form.current);
            dispatch(userLogin({
              login: formdata.get('login') as string || '',
              password: formdata.get('password') as string || '',
            }));
          }
        }}
      >
        <Grid container direction="column" justify="center" alignItems="center">
          {userState.queryStatus.isSuccessful
            ? <Alert severity="info">Enter login data</Alert>
            : <Alert severity="warning">Login orpassword incorrect</Alert>}
          <TextField style={{ marginTop: '10px' }} variant="filled" label="Login" required name="login" />
          <TextField style={{ marginTop: '10px' }} variant="filled" label="Password" required name="password" />
          <Grid container direction="row" justify="center" alignItems="center" style={{ marginTop: '10px' }}>
            {userState.queryStatus.isPending && <LinearProgress /> }
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              Login
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

export default Login;
