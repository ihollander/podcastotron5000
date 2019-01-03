import actionTypes from "../actions/types";

const user = JSON.parse(localStorage.getItem('user'))
const INITIAL_STATE = {
  loading: false,
  isSignedIn: !!user,
  user,
  error: null
};

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SIGNING_IN:
      return { ...state, loading: true };
    case actionTypes.LOGIN_ERROR:
      console.log(action.payload)
      return { ...state, loading: false, error: action.payload };
    case actionTypes.SIGNED_IN:
      return {
        ...state,
        isSignedIn: true,
        user: action.payload,
        loading: false,
        error: null
      };
    case actionTypes.SIGN_OUT:
      return {
        ...state,
        isSignedIn: false,
        user: null,
        loading: false,
        error: null
      };
    default:
      return state;
  }
};
