import types from "../actions/types";
import * as moment from "moment";

const INITIAL_PODCAST_STATE = {
  selectedPodcast: null,
  loading: false
};

export default (state = INITIAL_PODCAST_STATE, action) => {
  switch (action.type) {
    case types.LOADING_CREATE_PLAYLIST:
      if (!state.selectedPodcast) return state;

      const loadingEpisodes = state.selectedPodcast.episodes.map(e =>
        e.id === action.payload ? { ...e, creatingPlaylist: true } : e
      );
      return state.selectedPodcast
        ? {
            ...state,
            selectedPodcast: {
              ...state.selectedPodcast,
              episodes: loadingEpisodes
            }
          }
        : state;
    case types.CREATE_PLAYLIST:
      if (!state.selectedPodcast) return state;

      const updatedEpisodes = state.selectedPodcast.episodes.map(e =>
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
        selectedPodcast: { ...state.selectedPodcast, episodes: updatedEpisodes }
      };
    case types.REMOVE_PLAYLIST:
      if (!state.selectedPodcast) return state;

      const removeEpisodes = state.selectedPodcast.episodes.map(e =>
        e.id === action.payload.episode_id
          ? {
              ...e,
              creatingPlaylist: false,
              playlists: []
            }
          : e
      );
      return {
        ...state,
        selectedPodcast: { ...state.selectedPodcast, episodes: removeEpisodes }
      };
    case types.LOADING_CREATE_SUBSCRIPTION:
      if (!state.selectedPodcast) return state;

      return {
        ...state,
        selectedPodcast: { ...state.selectedPodcast, subscribing: true }
      };
    case types.REMOVE_SUBSCRIPTION:
      if (!state.selectedPodcast) return state;

      return {
        ...state,
        selectedPodcast: {
          ...state.selectedPodcast,
          subscribing: false,
          subscriptions: []
        }
      };
    case types.CREATE_SUBSCRIPTION:
      if (!state.selectedPodcast) return state;
      return {
        ...state,
        selectedPodcast: {
          ...state.selectedPodcast,
          subscribing: false,
          subscriptions: [
            ...state.selectedPodcast.subscriptions,
            action.payload
          ]
        }
      };
    case types.LOADING_FETCH_PODCAST:
      return { ...state, loading: true };
    case types.FETCH_PODCAST:
      action.payload.episodes.sort(
        (a, b) => moment(b.pubDate) - moment(a.pubDate)
      );
      return { ...state, selectedPodcast: action.payload, loading: false };
    default:
      return state;
  }
};
