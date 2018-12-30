import types from '../actions/types'

const INITIAL_PLAYLIST_STATE = {
  currentlyPlaying: null,
  queue: []
}

export default (state = INITIAL_PLAYLIST_STATE, action) => {
  switch (action.type) {
    case types.UPDATE_NOW_PLAYING:
      return { ...state, currentlyPlaying: action.payload }
    default:
      return state
  }
}