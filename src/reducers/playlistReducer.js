import { playlistTypes } from "../actionTypes/playlist";
import { authTypes } from "../actionTypes/auth";

const INITIAL_PLAYLIST_STATE = {
  currentlyPlaying: null,
  currentlyUpdating: null,
  queue: [],
  loading: false
};

export default (state = INITIAL_PLAYLIST_STATE, action) => {
  switch (action.type) {
    case authTypes.LOGOUT_SUCCESS:
      return INITIAL_PLAYLIST_STATE;
    case playlistTypes.CURRENT_TRACK_ENDED:
      return { ...state, currentlyPlaying: null };
    case playlistTypes.PLAYLISTS_LOADING:
      return { ...state, loading: true };
    case playlistTypes.PLAYLISTS_LOADED:
      return { ...state, queue: action.payload, loading: false };
    case playlistTypes.PLAYLIST_UPDATING:
      return { ...state, currentlyUpdating: action.payload };
    case playlistTypes.PLAYLIST_CREATED:
      return {
        ...state,
        currentlyUpdating: null,
        queue: [...state.queue, action.payload]
      };
    case playlistTypes.PLAYLIST_REMOVED:
      const removePlaylistsQueue = state.queue.filter(
        e => e.id !== action.payload
      );
      return { ...state, currentlyUpdating: null, queue: removePlaylistsQueue };
    case playlistTypes.UPDATE_NOW_PLAYING:
      const updatingQueue = state.queue.filter(
        e => e.episode_id !== action.payload.id
      );
      return {
        ...state,
        currentlyPlaying: action.payload,
        queue: updatingQueue
      };
    default:
      return state;
  }
};
