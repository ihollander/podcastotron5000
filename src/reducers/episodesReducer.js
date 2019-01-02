import types from "../actions/types";

const INITIAL_EPISODES_STATE = {
  page: 1,
  lastPage: false, // get last page from headers?
  episodes: [],
  loading: false
};

export default (state = INITIAL_EPISODES_STATE, action) => {
  switch (action.type) {
    case types.CREATE_SUBSCRIPTION:
    case types.REMOVE_SUBSCRIPTION:
      // reset state to load new subscriptions...
      return INITIAL_EPISODES_STATE
    case types.LOADING_CREATE_PLAYLIST:
      const loadingEpisodes = state.episodes.map(e =>
        e.id === action.payload ? { ...e, creatingPlaylist: true } : e
      );
      return {
        ...state,
        episodes: loadingEpisodes
      };
    case types.LOADING_RECENT_EPISODES:
      return { ...state, loading: true };
    case types.FETCH_RECENT_EPISODES:
      return {
        ...state,
        episodes: [...state.episodes, ...action.payload],
        loading: false,
        lastPage: !action.payload.length,
        page: state.page + 1
      };
    default:
      return state;
  }
};
