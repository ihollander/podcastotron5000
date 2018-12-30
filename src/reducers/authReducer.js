import actionTypes from '../actions/types'

const INITIAL_STATE = {
  loading: true,
  isSignedIn: null,
  googleUserId: null,
  user: null
}

export default (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case actionTypes.SIGN_IN:
      return { ...state, isSignedIn: true, googleUserId: action.payload, loading: false }
    case actionTypes.SIGN_OUT:
      return { ...state, isSignedIn: false, googleUserId: null, user: null, loading: false }
    case actionTypes.FETCH_USER:
      return { ...state, user: action.payload }
    default:
      return state
  }
}