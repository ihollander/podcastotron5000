import { authTypes } from "../actionTypes/auth";
import authAdaptor from "../adaptors/auth"
import history from "../history";

const signUp = formData => {
  const request = () => ({ type: authTypes.LOGIN_REQUEST });
  const success = user => ({ type: authTypes.LOGIN_SUCCESS, payload: user });
  const failure = error => ({ type: authTypes.LOGIN_ERROR, payload: error });

  return dispatch => {
    dispatch(request());

    authAdaptor.signUp({user: formData})
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

  return async dispatch => {
    dispatch(request());

    // quick example async/await
    try {
      const user = await authAdaptor.login({user: formData})
      dispatch(success(user))
      history.push("/")
    } catch (err) {
      dispatch(failure(err))
    }

    // authAdaptor.login({user: formData}).then(
    //     user => {
    //       dispatch(success(user))
    //       history.push("/")
    //     },
    //     error => {
    //       dispatch(failure(error))
    //     }
    //   )
  };
};

const googleAuth = token => {
  const request = () => ({ type: authTypes.LOGIN_REQUEST });
  const success = user => ({ type: authTypes.LOGIN_SUCCESS, payload: user });
  const failure = error => ({ type: authTypes.LOGIN_ERROR, payload: error });

  return dispatch => {
    dispatch(request());

    authAdaptor.googleAuth({token})
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
}

const signOut = () => {
  authAdaptor.logout()
  return {
    type: authTypes.LOGOUT_SUCCESS
  };
};

export const authActions = {
  signIn,
  signOut,
  signUp,
  googleAuth
};
