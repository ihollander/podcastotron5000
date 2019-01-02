import types from "../actions/types";

const INITIAL_EPISODES_STATE = {
  episodes: [],
  loading: false
};

export default (state = INITIAL_EPISODES_STATE, action) => {
  switch (action.type) {
    case types.LOADING_CREATE_PLAYLIST:
      const loadingEpisodes = state.episodes.map(e =>
        e.id === action.payload ? { ...e, creatingPlaylist: true } : e
      );
      return {
        ...state,
        episodes: loadingEpisodes
      };
    case types.CREATE_PLAYLIST:
      const updatedEpisodes = state.episodes.map(e =>
        e.id === action.payload.episode_id
          ? {
              ...e,
              creatingPlaylist: false,
              playlists: [...e.playlists, action.payload]
            }
          : e
      );
      return {
        ...state,
        episodes: updatedEpisodes
      };
    case types.REMOVE_PLAYLIST:
      const removePlaylists = state.episodes.map(e =>
        e.id === action.payload
          ? {
              ...e,
              creatingPlaylist: false,
              playlists: []
            }
          : e
      );
      return {
        ...state,
        episodes: removePlaylists
      };
    case types.LOADING_RECENT_EPISODES:
      return { ...state, loading: true };
    case types.FETCH_RECENT_EPISODES:
      return { ...state, episodes: action.payload, loading: false };
    default:
      return state;
  }
};
