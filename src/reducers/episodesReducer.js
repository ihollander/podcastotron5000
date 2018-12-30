import types from '../actions/types'

const INITIAL_EPISODES_STATE = {
  episodes: [],
  loading: false
}

export default (state = INITIAL_EPISODES_STATE, action) => {
  switch (action.type) {
    case types.LOADING_RECENT_EPISODES:
      return { ...state, loading: true }
    case types.FETCH_RECENT_EPISODES:
      return { ...state, episodes: action.payload, loading: false }
    default:
      return state
  }
}