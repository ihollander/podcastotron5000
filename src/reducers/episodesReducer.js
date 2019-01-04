import { authTypes } from "../actionTypes/auth";
import { subscriptionTypes } from "../actionTypes/subscription";
import { podcastTypes } from '../actionTypes/podcast'

const INITIAL_EPISODES_STATE = {
  page: 1,
  lastPage: false, // get last page from headers?
  episodes: [],
  loading: false
};

export default (state = INITIAL_EPISODES_STATE, action) => {
  switch (action.type) {
    case authTypes.LOGOUT_SUCCESS:
    case subscriptionTypes.SUBSCRIPTION_CREATED:
    case subscriptionTypes.SUBSCRIPTION_REMOVED:
      return INITIAL_EPISODES_STATE; // reset state to load new subscriptions...
    case podcastTypes.RECENT_EPISODES_LOADING:
      return { ...state, loading: true };
    case podcastTypes.RECENT_EPISODES_LOADED:
      return {
        ...state,
        episodes: [...state.episodes, ...action.payload],
        loading: false,
        lastPage: !action.payload.length,
        page: state.page + 1
      };
    default:
      return state;
  }
};
