import React, { useEffect } from 'react';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import { ButtonsType, LanguageType } from '../../redux/localisation-reducer';

const useStyles = makeStyles(() => createStyles({
  formControl: {
    minWidth: 100,
  },
}));

type MapStateToPropsType = {
  currentLanguage: LanguageType,
  languagesAvailable: Array<LanguageType>,
};

type MapDispatchToPropsType = {
  changeLanguage: (language: LanguageType) => Promise<void>,
};

type OwnProps = {
  buttonsNames: ButtonsType,
};

type PropsType = MapStateToPropsType & MapDispatchToPropsType & OwnProps;

const SelectLanguage: React.FC<PropsType> = ({
  buttonsNames, languagesAvailable, currentLanguage, changeLanguage,
}: PropsType) => {
  useEffect(() => {
    const lang = localStorage.getItem('lang');
    if (lang) {
      changeLanguage(lang as LanguageType);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('lang', currentLanguage);
  }, [currentLanguage]);

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    changeLanguage(event.target.value as LanguageType);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const menuItems = languagesAvailable.map(
    (langСode) => {
      const lang = langСode.split('-')[0];
      return <MenuItem key={langСode} value={langСode}>{lang}</MenuItem>;
    },
  );

  return (
    <FormControl className={classes.formControl}>
      <InputLabel id="demo-controlled-open-select-label">
        {buttonsNames.language}
      </InputLabel>
      <Select
        labelId="demo-controlled-open-select-label"
        id="demo-controlled-open-select"
        open={open}
        onClose={handleClose}
        onOpen={handleOpen}
        value={currentLanguage}
        onChange={handleChange}
      >
        {menuItems}
      </Select>
    </FormControl>
  );
};

export default SelectLanguage;
