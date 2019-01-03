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

const create = episodeId => {
  return (dispatch, getState) => {
    dispatch({
      type: types.UPDATING_PLAYLIST,
      payload: episodeId
    });

    const { id } = getState().auth.user;
    return apiAdapter
      .createPlaylist(id, episodeId)
      .then(playlist => {
        dispatch({
          type: types.CREATED_PLAYLIST,
          payload: playlist
        });
      })
      .catch(console.error);
  };
};

const remove = episodeId => {
  return (dispatch, getState) => {
    dispatch({
      type: types.UPDATING_PLAYLIST,
      payload: episodeId
    });

    const { id } = getState().auth.user;
    return apiAdapter
      .removePlaylist(id, episodeId)
      .then(() => {
        dispatch({
          type: types.REMOVED_PLAYLIST,
          payload: episodeId
        });
      })
      .catch(console.error);
  };
};

// fetch episode or retrieve from queue in state?
const updateNowPlaying = episodeId => {
  return (dispatch, getState) => {
    dispatch({
      type: types.LOADING_FETCH_EPISODE,
      payload: episodeId
    });

    return (
      apiAdapter
        .getEpisode(episodeId)
        .then(episode => {
          dispatch({
            type: types.UPDATE_NOW_PLAYING,
            payload: episode
          });
        })
        .then(() => {
        // remove from playlist if it's in there???
        const inPlaylist = getState().playlist.queue.some(e => e.id === episodeId)
        if (inPlaylist) {
          const { id } = getState().auth.user;
          apiAdapter.removePlaylist(id, episodeId).then(() => {
            dispatch({
              type: types.REMOVED_PLAYLIST,
              payload: episodeId
            });
          });
        }
        })
        .catch(console.error)
    );
  };
};

export const playlistActions = {
  currentTrackEnded,
  create,
  remove,
  getAll,
  updateNowPlaying
};
