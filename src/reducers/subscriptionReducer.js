import types from '../actions/types'

const INITIAL_SUBSCRIPTION_STATE = {
  podcasts: [],
  loading: false
}

export default (state = INITIAL_SUBSCRIPTION_STATE, action) => {
  switch (action.type) {
    case types.LOADING_FETCH_SUBSCRIPTIONS:
      return { ...state, loading: true }
    case types.CREATE_SUBSCRIPTION:
      return { ...state, podcasts: [...state.podcasts, action.payload]}
    case types.REMOVE_SUBSCRIPTION:
      let removePodcasts = state.podcasts.filter(p => p.id !== action.payload)
      return { ...state, podcasts: removePodcasts }
    case types.FETCH_SUBSCRIPTIONS:
      return { ...state, podcasts: [...action.payload], loading: false }
    default:
      return state
  }
}