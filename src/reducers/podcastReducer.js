import { podcastTypes } from "../actionTypes/podcast";
import { authTypes } from "../actionTypes/auth";
import * as moment from "moment";

const INITIAL_PODCAST_STATE = {
  selectedPodcast: null,
  loading: false
};

export default (state = INITIAL_PODCAST_STATE, action) => {
  switch (action.type) {
    case authTypes.LOGOUT_SUCCESS:
      return INITIAL_PODCAST_STATE
    case podcastTypes.PODCAST_LOADING:
      return { ...state, loading: true };
    case podcastTypes.PODCAST_LOADED:
      action.payload.episodes.sort(
        (a, b) => moment(b.pubDate) - moment(a.pubDate)
      );
      return { ...state, selectedPodcast: action.payload, loading: false };
    default:
      return state;
  }
};
