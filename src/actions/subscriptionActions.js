import types from './types'
import apiAdapter from '../apis/podcastApiAdapter'

const create = (podcast_id) => {
  return (dispatch) => {
    dispatch({
      type: types.UPDATING_SUBSCRIPTION,
      payload: podcast_id
    })

    return apiAdapter.addSubscription(podcast_id)
      .then(podcast => {
        dispatch({
          type: types.CREATED_SUBSCRIPTION,
          payload: podcast
        })
      })
      .catch(console.error)
  }
}

const remove = (podcast_id) => {
  return (dispatch) => {
    dispatch({
      type: types.UPDATING_SUBSCRIPTION,
      payload: podcast_id
    })

    return apiAdapter.removeSubscription(podcast_id)
      .then(() => {
        dispatch({
          type: types.REMOVED_SUBSCRIPTION,
          payload: podcast_id
        })
      })
      .catch(console.error)
  }
}

const getAll = () => {
  return (dispatch) => {
    dispatch({
      type: types.LOADING_FETCH_SUBSCRIPTIONS
    })

    return apiAdapter.getSubscriptions()
      .then(subscriptions => {
        dispatch({
          type: types.FETCH_SUBSCRIPTIONS,
          payload: subscriptions
        })
      })
      .catch(console.error)
  }
}

export const subscriptionActions = {
  create,
  remove,
  getAll
}