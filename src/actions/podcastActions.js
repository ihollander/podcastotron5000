import { podcastTypes } from "../actionTypes/podcast";
import podcastAdaptor from "../adaptors/podcast";

const search = searchTerm => {
  const request = () => ({
    type: podcastTypes.SEARCH_PODCASTS_LOADING,
    payload: searchTerm
  });
  const success = podcasts => ({
    type: podcastTypes.SEARCH_PODCASTS_LOADED,
    payload: podcasts
  });

  return dispatch => {
    dispatch(request());

    podcastAdaptor.searchPodcasts(searchTerm).then(
      podcasts => {
        dispatch(success(podcasts));
      },
      error => {
        console.error(error);
      }
    );
  };
};

const get = slug => {
  const request = () => ({
    type: podcastTypes.PODCAST_LOADING
  });
  const success = podcast => ({
    type: podcastTypes.PODCAST_LOADED,
    payload: podcast
  });

  return dispatch => {
    dispatch(request());

    podcastAdaptor.getPodcast(slug).then(
      podcast => {
        dispatch(success(podcast));
      },
      error => {
        console.error(error);
      }
    );
  };
};

const getRecentEpisodes = page => {
  const request = () => ({
    type: podcastTypes.RECENT_EPISODES_LOADING
  });
  const success = episodes => ({
    type: podcastTypes.RECENT_EPISODES_LOADED,
    payload: episodes
  });

  return dispatch => {
    dispatch(request());

    podcastAdaptor.getRecentEpisodes(page).then(
      episodes => {
        dispatch(success(episodes))
      }, error => {
        console.error(error);
      }
    )
  };
};

export const podcastActions = {
  search,
  get,
  getRecentEpisodes
};
