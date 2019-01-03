import types from '../actions/types'

const INITIAL_PODCASTS_STATE = {
  searchResults: [],
  searchTerm: '',
  loading: false
}

export default (state = INITIAL_PODCASTS_STATE, action) => {
  switch (action.type) {
    case types.SIGN_OUT:
      return INITIAL_PODCASTS_STATE
    case types.LOADING_SEARCH_PODCASTS:
      return { ...state, searchTerm: action.payload, loading: true }
    case types.SEARCH_PODCASTS:
      return { ...state, searchResults: action.payload, loading: false }
    default:
      return state
  }
}