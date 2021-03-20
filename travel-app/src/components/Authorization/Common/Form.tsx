import React, {
  ReactNode, useRef,
} from 'react';

import {
  Grid, Button, LinearProgress,
} from '@material-ui/core';
import Alert from '@material-ui/lab/Alert';
import { useDispatch } from 'react-redux';
import { Redirect } from 'react-router-dom';
import useTypedSelector from '../../../redux/reducers/hooks/useTypedSelector';

type Props = {
  children: ReactNode;
  formName: string;
  warning: string;
  action: Function;
};

function CredentialsForm({
  children, formName, warning, action,
}: Props) {
  const userState = useTypedSelector((state) => state.userState);
  const dispatch = useDispatch();
  const form = useRef<HTMLFormElement>(null);

  return (
    <div>
      {userState.isLoged && <Redirect to="/" /> }
      <form
        ref={form}
        name={`${formName}Form`}
        noValidate={false}
        autoComplete="off"
        action="#"
        onSubmit={async (e) => {
          e.preventDefault();
          if (form.current) {
            const formdata = new FormData(form.current);
            dispatch(action(formdata));
          }
        }}
        style={{ maxWidth: '350px', margin: '0 auto' }}
      >
        <Grid container direction="column" justify="center" alignItems="center">
          {
            userState.queryStatus.isSuccessful
              ? (
                <Alert severity="info">{`Enter ${formName.toLowerCase()} data`}</Alert>
              )
              : <Alert severity="warning">{warning}</Alert>
          }
          {children}
          {userState.queryStatus.isPending && <LinearProgress /> }
          <Grid container direction="row" justify="space-evenly" alignItems="center" style={{ margin: '10px' }}>
            {userState.queryStatus.isPending && <LinearProgress /> }
            <Button
              variant="contained"
              color="primary"
              type="submit"
            >
              {`${formName}`}
            </Button>
            <Button variant="contained" color="secondary" href="/">
              Cancel
            </Button>

          </Grid>
        </Grid>
      </form>
    </div>
  );
}

export default CredentialsForm;
