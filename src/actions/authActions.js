import { authTypes } from "../actionTypes/auth";
import authService from "../services/authService"
import history from "../history";

const signUp = formData => {
  const request = () => ({ type: authTypes.SIGNING_IN });
  const success = user => ({ type: authTypes.SIGNED_IN, payload: user });
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
  const request = () => ({ type: authTypes.SIGNING_IN });
  const success = user => ({ type: authTypes.SIGNED_IN, payload: user });
  const failure = error => ({ type: authTypes.LOGIN_ERROR, payload: error });

  return dispatch => {
    dispatch(request());

    authService.login({user: formData})
      .then(
        user => {
          console.log('success:', user)
          dispatch(success(user))
          history.push("/")
        },
        error => {
          console.log('error:', error)
          dispatch(failure(error))
        }
      )
  };
};

const signOut = () => {
  authService.logout()
  return {
    type: authTypes.SIGN_OUT
  };
};

export const authActions = {
  signIn,
  signOut,
  signUp
};
