import { playlistTypes } from "../actionTypes/playlist";
import playlistAdaptor from "../adaptors/playlist";

const currentTrackEnded = episodeId => {
  return {
    type: playlistTypes.CURRENT_TRACK_ENDED,
    payload: episodeId
  };
};

const getAll = () => {
  const request = () => ({ type: playlistTypes.PLAYLISTS_LOADING });
  const success = playlists => ({
    type: playlistTypes.PLAYLISTS_LOADED,
    payload: playlists
  });

  return dispatch => {
    dispatch(request());

    playlistAdaptor.getAll().then(
      playlists => {
        dispatch(success(playlists));
      },
      error => {
        console.error(error);
      }
    );
  };
};

const create = episodeId => {
  const request = episodeId => ({
    type: playlistTypes.PLAYLIST_UPDATING,
    payload: episodeId
  });
  const success = playlist => ({
    type: playlistTypes.PLAYLIST_CREATED,
    payload: playlist
  });

  return dispatch => {
    dispatch(request(episodeId));

    playlistAdaptor.create(episodeId).then(
      playlist => {
        dispatch(success(playlist));
      },
      error => {
        console.error(error);
      }
    );
  };
};

const remove = episodeId => {
  const request = episodeId => ({
    type: playlistTypes.PLAYLIST_UPDATING,
    payload: episodeId
  });
  const success = episodeId => ({
    type: playlistTypes.PLAYLIST_REMOVED,
    payload: episodeId
  });

  return dispatch => {
    dispatch(request(episodeId));

    playlistAdaptor.remove(episodeId).then(
      () => {
        dispatch(success(episodeId));
      }
    );
  };
};

// fetch episode or send as params?
const updateNowPlaying = episodeId => {
  const request = episodeId => ({
    type: playlistTypes.PLAYLIST_UPDATING,
    payload: episodeId
  });
  const success = episode => ({
    type: playlistTypes.UPDATE_NOW_PLAYING,
    payload: episode
  });
  const removeSuccess = episodeId => ({
    type: playlistTypes.PLAYLIST_REMOVED,
    payload: episodeId
  });

  return (dispatch, getState) => {
    dispatch(request(episodeId));

    playlistAdaptor.get(episodeId).then(
      episode => {
        dispatch(success(episode));

        // remove from playlist if it's in there???
        const inPlaylist = getState().playlist.queue.some(
          e => e.id === episodeId
        );
        if (inPlaylist) {
          playlistAdaptor.remove(episodeId).then(() => {
            dispatch(removeSuccess(episodeId));
          });
        }
      },
      error => {
        console.error(error);
      }
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
