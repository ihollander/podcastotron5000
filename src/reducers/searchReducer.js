import { authTypes } from "../actionTypes/auth";
import { podcastTypes } from "../actionTypes/podcast";

const INITIAL_PODCASTS_STATE = {
  searchResults: [],
  searchTerm: "",
  loading: false
};

export default (state = INITIAL_PODCASTS_STATE, action) => {
  switch (action.type) {
    case authTypes.LOGOUT_SUCCESS:
      return INITIAL_PODCASTS_STATE;
    case podcastTypes.SEARCH_PODCASTS_LOADING:
      return { ...state, searchTerm: action.payload, loading: true };
    case podcastTypes.SEARCH_PODCASTS_LOADED:
      return { ...state, searchResults: action.payload, loading: false };
    default:
      return state;
  }
};
