import types from "./types";
import apiAdapter from "../apis/podcastApiAdapter";
import history from "../history";

const signIn = googleUserId => {
  return dispatch => {
    dispatch({
      type: types.SIGN_IN,
      payload: googleUserId
    });

    return apiAdapter
      .userCreate({ google_id: googleUserId })
      .then(user => {
        dispatch({
          type: types.FETCH_USER,
          payload: user
        });
        history.push("/");
      })
      .catch(console.error);
  };
};

const signOut = () => {
  return {
    type: types.SIGN_OUT
  };
};

export const authActions = {
  signIn,
  signOut
};
