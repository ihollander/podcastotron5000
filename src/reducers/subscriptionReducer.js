import types from "../actions/types";

const INITIAL_SUBSCRIPTION_STATE = {
  podcasts: [],
  loading: false,
  currentlyUpdating: null
};

export default (state = INITIAL_SUBSCRIPTION_STATE, action) => {
  switch (action.type) {
    case types.SIGN_OUT:
      return INITIAL_SUBSCRIPTION_STATE;
    case types.LOADING_FETCH_SUBSCRIPTIONS:
      return { ...state, loading: true };
    case types.UPDATING_SUBSCRIPTION:
      return { ...state, currentlyUpdating: action.payload };
    case types.CREATED_SUBSCRIPTION:
      return {
        ...state,
        currentlyUpdating: null,
        podcasts: [...state.podcasts, action.payload]
      };
    case types.REMOVED_SUBSCRIPTION:
      let removePodcasts = state.podcasts.filter(p => p.id !== action.payload);
      return { ...state, currentlyUpdating: null, podcasts: removePodcasts };
    case types.FETCH_SUBSCRIPTIONS:
      return { ...state, podcasts: [...action.payload], loading: false };
    default:
      return state;
  }
};
