import { subscriptionTypes } from "../actionTypes/subscription";
import { authTypes } from "../actionTypes/auth";

const INITIAL_SUBSCRIPTION_STATE = {
  podcasts: [],
  loading: false,
  currentlyUpdating: null
};

export default (state = INITIAL_SUBSCRIPTION_STATE, action) => {
  switch (action.type) {
    case authTypes.LOGOUT_SUCCESS:
      return INITIAL_SUBSCRIPTION_STATE;
    case subscriptionTypes.SUBSCRIPTIONS_LOADING:
      return { ...state, loading: true };
    case subscriptionTypes.SUBSCRIPTIONS_LOADED:
      return { ...state, podcasts: [...action.payload], loading: false };
    case subscriptionTypes.SUBSCRIPTION_UPDATING:
      return { ...state, currentlyUpdating: action.payload };
    case subscriptionTypes.SUBSCRIPTION_CREATED:
      return {
        ...state,
        currentlyUpdating: null,
        podcasts: [...state.podcasts, action.payload]
      };
    case subscriptionTypes.SUBSCRIPTION_REMOVED:
      let removePodcasts = state.podcasts.filter(p => p.id !== action.payload);
      return { ...state, currentlyUpdating: null, podcasts: removePodcasts };
    default:
      return state;
  }
};
