import types from "../actions/types";

const INITIAL_PLAYLIST_STATE = {
  currentlyPlaying: null,
  queue: [],
  loading: false
};

export default (state = INITIAL_PLAYLIST_STATE, action) => {
  switch (action.type) {
    case types.CURRENT_TRACK_ENDED:
      return { ...state, currentlyPlaying: null };
    case types.LOADING_FETCH_PLAYLISTS:
      return { ...state, loading: true };
    case types.FETCH_PLAYLISTS:
      return { ...state, queue: action.payload, loading: false };
    case types.CREATE_PLAYLIST:
      return { ...state, queue: [...state.queue, action.payload] };
    case types.REMOVE_PLAYLIST:
      const removePlaylistsQueue = state.queue.filter(
        e => e.episode_id !== action.payload
      );
      return { ...state, queue: removePlaylistsQueue };
    case types.UPDATE_NOW_PLAYING:
      const updatingQueue = state.queue.filter(
        e => e.episode_id !== action.payload.id
      );
      return { ...state, currentlyPlaying: action.payload, queue: updatingQueue };
    default:
      return state;
  }
};
