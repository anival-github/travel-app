import React from 'react';
import TextField from '@material-ui/core/TextField';
import TextInputs from '../Types';

type Props = {
  arrOfTextInputs: TextInputs[];
};

export default function TextInputFields({ arrOfTextInputs }: Props) {
  return (
    <>
      {arrOfTextInputs.map((inputField) => (
        <TextField
          style={{ marginTop: '10px' }}
          variant="filled"
          label={
            inputField.name
          }
          name={
            inputField.name
          }
          key={
            inputField.name
          }
          required={inputField.required}
        />
      ))}
    </>
  );
}
