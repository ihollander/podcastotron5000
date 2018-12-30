import types from '../actions/types'
import * as moment from 'moment'

const INITIAL_PODCAST_STATE = {
  selectedPodcast: null,
  loading: false
}

export default (state = INITIAL_PODCAST_STATE, action) => {
  switch (action.type) {
    case types.LOADING_CREATE_SUBSCRIPTION:
      return state.selectedPodcast 
        ? { ...state, selectedPodcast: { ...state.selectedPodcast, subscribing: true } }
        : state
    case types.REMOVE_SUBSCRIPTION:
      return state.selectedPodcast 
        ? { ...state, selectedPodcast: { ...state.selectedPodcast, subscribing: false, subscriptions: [] } }
        : state
    case types.CREATE_SUBSCRIPTION:
      return state.selectedPodcast 
        ? { ...state, selectedPodcast:  { ...state.selectedPodcast, subscribing: false, subscriptions: [...state.selectedPodcast.subscriptions, action.payload] } }
        : state
    case types.LOADING_FETCH_PODCAST:
      return { ...state, loading: true }
    case types.FETCH_PODCAST:
      action.payload.episodes.sort((a, b) => moment(b.pubDate) - moment(a.pubDate))
      return { ...state, selectedPodcast: action.payload, loading: false }
    default:
      return state
  }
}