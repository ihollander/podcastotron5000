import types from "./types";
import apiAdapter from "../apis/podcastApiAdapter";
import history from "../history";

const signUp = formData => {
  return dispatch => {
    dispatch({
      type: types.SIGNING_IN
    });

    return apiAdapter
      .userCreate({ user: formData })
      .then(user => {
        if (user.jwt) {
          //success!
          localStorage.setItem("user", JSON.stringify(user));
          dispatch({
            type: types.SIGNED_IN,
            payload: user
          });
          history.push("/");
        }
      })
      .catch(error => error.json())
      .then(errorJson => {
        dispatch({
          type: types.LOGIN_ERROR,
          payload: errorJson
        });
      });
  };
};

const signIn = formData => {
  return dispatch => {
    dispatch({
      type: types.SIGNING_IN
    });

    return apiAdapter
      .userSignIn({ user: formData })
      .then(user => {
        if (user.jwt) {
          //success!
          localStorage.setItem("user", JSON.stringify(user));
          dispatch({
            type: types.SIGNED_IN,
            payload: user
          });
          history.push("/");
        }
      })
      .catch(error => error.json())
      .then(errorJson => {
        dispatch({
          type: types.LOGIN_ERROR,
          payload: errorJson
        });
      });
  };
};

const signOut = () => {
  localStorage.removeItem("user");
  return {
    type: types.SIGN_OUT
  };
};

export const authActions = {
  signIn,
  signOut,
  signUp
};
