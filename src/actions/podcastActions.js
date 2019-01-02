import types from './types'
import apiAdapter from '../apis/podcastApiAdapter'

const search = searchTerm => {
  return (dispatch, getState) => {
    dispatch({
      type: types.LOADING_SEARCH_PODCASTS,
      payload: searchTerm
    })

    const { id } = getState().auth.user
    return apiAdapter.searchPodcasts(id, searchTerm)
      .then(podcasts => {
        dispatch({
          type: types.SEARCH_PODCASTS,
          payload: podcasts
        })
      })
      .catch(console.error)
  }
}

const get = slug => {
  return (dispatch, getState) => {
    dispatch({
      type: types.LOADING_FETCH_PODCAST
    })

    const { id } = getState().auth.user
    return apiAdapter.getPodcast(id, slug)
      .then(podcast => {
        dispatch({
          type: types.FETCH_PODCAST,
          payload: podcast
        })
      })
      .catch(console.error)
  }
}

const getRecentEpisodes = page => {
  return (dispatch, getState) => {
    dispatch({
      type: types.LOADING_RECENT_EPISODES
    })

    const { id } = getState().auth.user
    return apiAdapter.getRecentEpisodes(id, page)
      .then(response => {
        dispatch({
          type: types.FETCH_RECENT_EPISODES,
          payload: response
        })
      })
      .catch(console.error)
  }
}

export const podcastActions = {
  search,
  get,
  getRecentEpisodes
}