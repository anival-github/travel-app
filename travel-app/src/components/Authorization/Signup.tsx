import React, { FC } from 'react';
import { userRegistration } from '../../redux/reducers/UserStateReduser';
import SetAvatar from './Common/SetAvatar';
import CredentialsForm from './Common/Form';
import TextInputFields from './Common/TextInputFields';
import TextInputs from './Types';

const arrOfTextInputs: TextInputs[] = [
  { name: 'name', required: false },
  { name: 'login', required: true },
  { name: 'email', required: true },
  { name: 'password', required: true },
];
const Signup: FC = () => (

  <CredentialsForm
    formName="Registration"
    warning="Login or email alredy taken"
    action={userRegistration}
  >
    <SetAvatar />
    <TextInputFields arrOfTextInputs={arrOfTextInputs} />
  </CredentialsForm>

);

export default Signup;
