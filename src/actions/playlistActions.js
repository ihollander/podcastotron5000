import types from "./types";
import apiAdapter from "../apis/podcastApiAdapter";

const currentTrackEnded = episode_id => {
  return {
    type: types.CURRENT_TRACK_ENDED,
    payload: episode_id
  };
};

const getAll = () => {
  return (dispatch, getState) => {
    dispatch({
      type: types.LOADING_FETCH_PLAYLISTS
    });

    const { id } = getState().auth.user;
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

const create = episode_id => {
  return (dispatch, getState) => {
    dispatch({
      type: types.LOADING_CREATE_PLAYLIST,
      payload: episode_id
    });

    const { id } = getState().auth.user;
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

    const { id } = getState().auth.user;
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

// fetch episode or retrieve from queue in state?
const updateNowPlaying = (episode_id, playlist_id) => {
  return (dispatch, getState) => {
    dispatch({
      type: types.LOADING_FETCH_EPISODE,
      payload: episode_id
    });

    // if (playlist_id) {
    //   const { id } = getState().auth.user;
    //   apiAdapter.removePlaylist(id, playlist_id);
    // }

    return apiAdapter
      .getEpisode(episode_id)
      .then(episode => {
        dispatch({
          type: types.UPDATE_NOW_PLAYING,
          payload: episode
        });
      })
      .then(() => {
        // remove from playlist if it's in there
        if (playlist_id) {
          apiAdapter.removePlaylist(episode_id, playlist_id).then(() => {
            dispatch({
              type: types.REMOVE_PLAYLIST,
              payload: episode_id
            });
          });
        }
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
