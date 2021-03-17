import React from 'react';
import TextField from '@material-ui/core/TextField';
import ClearIcon from '@material-ui/icons/Clear';
import { IconButton } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import { connect } from 'react-redux';
import { AppStateType } from '../../redux/store';
import { setSearchQuery, SetSearchQueryType } from '../../redux/search-reducer';

type MapStateToPropsType = {
  searchQuery: string,
};

type MapDispatchToProps = {
  setSearchQuery: (searchQuery: string) => SetSearchQueryType,
};

type PropsType = MapStateToPropsType & MapDispatchToProps;
const SearchForm: React.FC<PropsType> = ({ searchQuery, setSearchQuery }: PropsType) => (
  <form noValidate autoComplete="off">
    <TextField
      id="outlined-basic"
      label="Find a country"
      variant="outlined"
      value={searchQuery}
      onChange={(e) => setSearchQuery(e.target.value)}
      autoFocus
    />
    <IconButton
      aria-label="delete"
      onClick={() => setSearchQuery(searchQuery)}
    >
      <SearchIcon />
    </IconButton>
    <IconButton
      aria-label="delete"
      onClick={() => setSearchQuery('')}
    >
      <ClearIcon />
    </IconButton>
  </form>
);

const mapStateToProps = (state: AppStateType): MapStateToPropsType => ({
  searchQuery: state.search.searchQuery,
});

export default connect(mapStateToProps, { setSearchQuery })(SearchForm);
