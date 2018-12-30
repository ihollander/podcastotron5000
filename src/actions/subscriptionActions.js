import types from './types'
import apiAdapter from '../apis/podcastApiAdapter'

const create = (podcast_id) => {
  return (dispatch, getState) => {
    dispatch({
      type: types.LOADING_CREATE_SUBSCRIPTION,
      payload: podcast_id
    })

    const { id } = getState().auth.user
    return apiAdapter.addSubscription(id, { podcast_id })
      .then(podcast => {
        dispatch({
          type: types.CREATE_SUBSCRIPTION,
          payload: podcast
        })
      })
      .catch(console.error)
  }
}

const remove = (podcast_id, subscriptionId) => {
  return (dispatch, getState) => {
    dispatch({
      type: types.LOADING_CREATE_SUBSCRIPTION,
      payload: podcast_id
    })

    const { id } = getState().auth.user
    return apiAdapter.removeSubscription(id, subscriptionId)
      .then(() => {
        dispatch({
          type: types.REMOVE_SUBSCRIPTION,
          payload: podcast_id
        })
      })
      .catch(console.error)
  }
}

const getAll = () => {
  return (dispatch, getState) => {
    dispatch({
      type: types.LOADING_FETCH_SUBSCRIPTIONS
    })

    const { id } = getState().auth.user
    return apiAdapter.getSubscriptions(id)
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