const SET_SEARCH_QUERY = 'travel-app/search/SET_SEARCH_QUERY';

const InitialState = {
  searchQuery: '',
};

type InitialStateType = typeof InitialState;

type ActionsType = SetSearchQueryType;

const searchReducer = (state = InitialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case SET_SEARCH_QUERY:
      return {
        ...state,
        searchQuery: action.searchQuery,
      };
    default:
      return state;
  }
};

export type SetSearchQueryType = {
  type: typeof SET_SEARCH_QUERY,
  searchQuery: string,
};

export const setSearchQuery = (searchQuery: string): SetSearchQueryType => ({
  type: SET_SEARCH_QUERY,
  searchQuery,
});

export default searchReducer;
