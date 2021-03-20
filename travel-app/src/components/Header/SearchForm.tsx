import React from 'react';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { setSearchQuery, SetSearchQueryType } from '../../redux/search-reducer';
import { ButtonsType } from '../../redux/localisation-reducer';

type MapStateToPropsType = {
  searchQuery: string,
};

type MapDispatchToProps = {
  setSearchQuery: (searchQuery: string) => SetSearchQueryType,
};

type OwnProps = {
  buttonsNames: ButtonsType,
};

type PropsType = MapStateToPropsType & MapDispatchToProps & OwnProps;
const SearchForm: React.FC<PropsType> = ({
  buttonsNames, searchQuery, setSearchQuery,
}: PropsType) => (
  <form noValidate autoComplete="off">
    <TextField
      id="outlined-basic"
      label={buttonsNames.findCoutry}
      variant="outlined"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      autoFocus
      color="secondary"
    />
    <div>

      <IconButton
        aria-label="delete"
        onClick={() => setSearchQuery(searchQuery)}
      >
        <SearchIcon style={{ color: 'white' }} />
      </IconButton>
      <IconButton
        aria-label="delete"
        onClick={() => setSearchQuery('')}
      >
        <ClearIcon style={{ color: 'white' }} />
      </IconButton>
    </div>
  </form>
);

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  searchQuery: state.search.searchQuery,
});

export default connect(mapStateToProps, { setSearchQuery })(SearchForm);
