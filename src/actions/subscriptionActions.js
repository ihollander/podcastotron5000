import { subscriptionTypes } from "../actionTypes/subscription";
import subscriptionAdaptor from "../adaptors/subscription";

const create = podcastId => {
  const request = podcastId => ({
    type: subscriptionTypes.SUBSCRIPTION_UPDATING,
    payload: podcastId
  });
  const success = podcast => ({
    type: subscriptionTypes.SUBSCRIPTION_CREATED,
    payload: podcast
  });

  return dispatch => {
    dispatch(request(podcastId));

    subscriptionAdaptor.create(podcastId).then(
      podcast => {
        dispatch(success(podcast));
      },
      error => {
        console.error(error);
      }
    );
  };
};

const remove = podcastId => {
  const request = () => ({
    type: subscriptionTypes.SUBSCRIPTION_UPDATING,
    payload: podcastId
  });
  const success = () => ({
    type: subscriptionTypes.SUBSCRIPTION_REMOVED,
    payload: podcastId
  });

  return dispatch => {
    dispatch(request());

    subscriptionAdaptor.remove(podcastId).then(
      () => {
        dispatch(success());
      },
      error => {
        console.error(error);
      }
    );
  };
};

const getAll = () => {
  const request = () => ({
    type: subscriptionTypes.SUBSCRIPTIONS_LOADING
  });
  const success = subscriptions => ({
    type: subscriptionTypes.SUBSCRIPTIONS_LOADED,
    payload: subscriptions
  });

  return dispatch => {
    dispatch(request());

    subscriptionAdaptor.getAll().then(
      subscriptions => {
        dispatch(success(subscriptions));
      },
      error => {
        console.error(error);
      }
    );
  };
};

export const subscriptionActions = {
  create,
  remove,
  getAll
};
