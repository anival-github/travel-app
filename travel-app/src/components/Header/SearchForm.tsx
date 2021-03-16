import React from 'react';
import TextField from '@material-ui/core/TextField';

const SearchForm: React.FC = () => (
  <form
    noValidate
    autoComplete="off"
  >
    <TextField id="outlined-basic" label="Change country" variant="outlined" />
  </form>
);

export default SearchForm;
