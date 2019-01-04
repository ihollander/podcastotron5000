import { authTypes } from "../actionTypes/auth";
import authService from "../adaptors/auth"
import history from "../history";

const signUp = formData => {
  const request = () => ({ type: authTypes.LOGIN_REQUEST });
  const success = user => ({ type: authTypes.LOGIN_SUCCESS, payload: user });
  const failure = error => ({ type: authTypes.LOGIN_ERROR, payload: error });

  return dispatch => {
    dispatch(request());

    authService.signUp({user: formData})
      .then(
        user => {
          dispatch(success(user))
          history.push("/")
        },
        error => {
          dispatch(failure(error))
        }
      )
  };
};

const signIn = formData => {
  const request = () => ({ type: authTypes.LOGIN_REQUEST });
  const success = user => ({ type: authTypes.LOGIN_SUCCESS, payload: user });
  const failure = error => ({ type: authTypes.LOGIN_ERROR, payload: error });

  return dispatch => {
    dispatch(request());

    authService.login({user: formData})
      .then(
        user => {
          dispatch(success(user))
          history.push("/")
        },
        error => {
          dispatch(failure(error))
        }
      )
  };
};

const signOut = () => {
  authService.logout()
  return {
    type: authTypes.LOGOUT_SUCCESS
  };
};

export const authActions = {
  signIn,
  signOut,
  signUp
};
