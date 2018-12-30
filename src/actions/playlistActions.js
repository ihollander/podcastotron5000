import types from './types'

const updateNowPlaying = (audioLink, audioType) => {
  return {
    type: types.UPDATE_NOW_PLAYING,
    payload: { audioLink, audioType }
  }
}

export const playlistActions = {
  updateNowPlaying
}