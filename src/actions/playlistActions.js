import types from "./types";
import apiAdapter from "../apis/podcastApiAdapter";

const currentTrackEnded = (episode_id, playlist_id) => {
  return (dispatch, getState) => {
    dispatch({
      type: types.LOADING_CREATE_PLAYLIST,
      payload: episode_id
    });

    const { id } = getState().auth.user
    return apiAdapter
      .removePlaylist(id, playlist_id)
      .then(() => {
        dispatch({
          type: types.CURRENT_TRACK_ENDED,
          payload: episode_id
        });
      })
      .catch(console.error);
  };
};

const getAll = () => {
  return (dispatch, getState) => {
    dispatch({
      type: types.LOADING_FETCH_PLAYLISTS
    });

    const { id } = getState().auth.user
    return apiAdapter
      .getPlaylists(id)
      .then(playlists => {
        dispatch({
          type: types.FETCH_PLAYLISTS,
          payload: playlists
        });
      })
      .catch(console.error);
  };
};

const create = (episode_id) => {
  return (dispatch, getState) => {
    dispatch({
      type: types.LOADING_CREATE_PLAYLIST,
      payload: episode_id
    });

    const { id } = getState().auth.user
    return apiAdapter
      .createPlaylist(id, { episode_id })
      .then(playlist => {
        dispatch({
          type: types.CREATE_PLAYLIST,
          payload: playlist
        });
      })
      .catch(console.error);
  };
};

const remove = (episode_id, playlist_id) => {
  return (dispatch, getState) => {
    dispatch({
      type: types.LOADING_CREATE_PLAYLIST,
      payload: episode_id
    });

    const { id } = getState().auth.user
    return apiAdapter
      .removePlaylist(id, playlist_id)
      .then(() => {
        dispatch({
          type: types.REMOVE_PLAYLIST,
          payload: episode_id
        });
      })
      .catch(console.error);
  };
};

// fetch episode 
const updateNowPlaying = (episode_id) => {
  return dispatch => {
    dispatch({
      type: types.LOADING_FETCH_EPISODE,
      payload: episode_id
    });

    return apiAdapter
      .getEpisode(episode_id)
      .then(episode => {
        dispatch({
          type: types.UPDATE_NOW_PLAYING,
          payload: episode
        });
      })
      .catch(console.error);
  };
};

export const playlistActions = {
  currentTrackEnded,
  create,
  remove,
  getAll,
  updateNowPlaying
};
