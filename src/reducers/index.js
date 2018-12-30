import { combineReducers } from "redux";

import searchReducer from './searchReducer'
import podcastReducer from './podcastReducer'
import subscriptionReducer from './subscriptionReducer'
import playlistReducer from './playlistReducer'
import episodesReducer from './episodesReducer'
import authReducer from "./authReducer";

export default combineReducers({
  auth: authReducer,
  search: searchReducer,
  podcast: podcastReducer,
  subscriptions: subscriptionReducer,
  playlist: playlistReducer,
  episodes: episodesReducer
})