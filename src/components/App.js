import React from 'react'
import { Router, Switch } from 'react-router-dom'
import { connect } from 'react-redux'

import history from '../history'

import LoginLayoutRoute from './routes/LoginLayoutRoute'
import AuthenticatedLayoutRoute from './routes/AuthenticatedLayoutRoute'

import LoginContainer from './login/LoginContainer'
import SubscriptionContainer from './subscriptions/SubscriptionContainer'
import SearchResultContainer from './search/SearchResultContainer'
import PodcastContainer from './podcasts/PodcastContainer'
import EpisodeContainer from './episodes/RecentEpisodesContainer'
import PlaylistContainer from './playlist/PlaylistContainer'

const App = props => {
  return (
    <Router history={history}>
      <Switch>
        <LoginLayoutRoute exact path="/login" component={LoginContainer} />
        <AuthenticatedLayoutRoute isAuthenticated={props.auth.isSignedIn} exact path="/" component={SubscriptionContainer} />
        <AuthenticatedLayoutRoute isAuthenticated={props.auth.isSignedIn} exact path="/recent" component={EpisodeContainer} />
        <AuthenticatedLayoutRoute isAuthenticated={props.auth.isSignedIn} exact path="/playlist" component={PlaylistContainer} />
        <AuthenticatedLayoutRoute isAuthenticated={props.auth.isSignedIn} exact path="/podcasts/:id" component={PodcastContainer} />
        <AuthenticatedLayoutRoute isAuthenticated={props.auth.isSignedIn} exact path="/search/:term" component={SearchResultContainer} />
      </Switch>
    </Router>
  )
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  }
}

export default connect(mapStateToProps)(App)