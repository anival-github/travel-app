import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

const useStyles = makeStyles((theme: Theme) => createStyles({
  button: {
    display: 'block',
    marginTop: theme.spacing(1),
  },
  formControl: {
    minWidth: 100,
  },
}));

export default function ControlledOpenSelect() {
  const classes = useStyles();
  const [language, setlanguage] = React.useState<string | number>('');
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    setlanguage(event.target.value as number);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  return (
    <div>
      <Button className={classes.button} onClick={handleOpen}>
        Change language
      </Button>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">language</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={language}
          onChange={handleChange}
        >
          <MenuItem value={10}>rus</MenuItem>
          <MenuItem value={20}>eng</MenuItem>
          <MenuItem value={30}>de</MenuItem>
        </Select>
      </FormControl>
    </div>
  );
}
