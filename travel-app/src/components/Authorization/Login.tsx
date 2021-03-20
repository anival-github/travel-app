import React, { FC } from 'react';
import CredentialsForm from './Common/Form';
import TextInputFields from './Common/TextInputFields';
import TextInputs from './Common/Types';
import { userLogin } from '../../redux/reducers/UserStateReduser';

const arrOfTextInputs: TextInputs[] = [
  { name: 'login', required: true },
  { name: 'password', required: true },
];

const Login: FC = () => (
  <CredentialsForm
    formName="Login"
    warning="Login or password incorrect"
    action={userLogin}
  >
    <TextInputFields arrOfTextInputs={arrOfTextInputs} />
  </CredentialsForm>
);

export default Login;
