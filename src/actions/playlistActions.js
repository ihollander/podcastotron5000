import types from "./types";
import apiAdapter from "../apis/podcastApiAdapter";

const currentTrackEnded = episode_id => {
  return {
    type: types.CURRENT_TRACK_ENDED,
    payload: episode_id
  };
};

const getAll = () => {
  return (dispatch) => {
    dispatch({
      type: types.LOADING_FETCH_PLAYLISTS
    });

    return apiAdapter
      .getPlaylists()
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
  return (dispatch) => {
    dispatch({
      type: types.UPDATING_PLAYLIST,
      payload: episodeId
    });

    return apiAdapter
      .createPlaylist(episodeId)
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
  return (dispatch) => {
    dispatch({
      type: types.UPDATING_PLAYLIST,
      payload: episodeId
    });

    return apiAdapter
      .removePlaylist(episodeId)
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
          apiAdapter.removePlaylist(episodeId).then(() => {
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
