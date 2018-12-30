import types from '../actions/types'

const INITIAL_PODCASTS_STATE = {
  searchResults: [],
  searchTerm: '',
  loading: false
}

export default (state = INITIAL_PODCASTS_STATE, action) => {
  switch (action.type) {
    case types.LOADING_CREATE_SUBSCRIPTION:
      let searchResults = state.searchResults.map(p => p.id === action.payload ? { ...p, subscribing: true } : p)
      return { ...state, searchResults }
    case types.REMOVE_SUBSCRIPTION:
      let removeSearchResults = state.searchResults.map(p => p.id === action.payload ? { ...p, subscribing: false, subscriptions: [] } : p)
      return { ...state, searchResults: removeSearchResults }
    case types.CREATE_SUBSCRIPTION:
      let createSearchResults = state.searchResults.map(p => p.id === action.payload.podcast_id ? { ...p, subscriptions: [...p.subscriptions, action.payload], subscribing: false } : p)
      return { ...state, searchResults: createSearchResults }
    case types.LOADING_SEARCH_PODCASTS:
      return { ...state, searchTerm: action.payload, loading: true }
    case types.SEARCH_PODCASTS:
      return { ...state, searchResults: action.payload, loading: false }
    default:
      return state
  }
}