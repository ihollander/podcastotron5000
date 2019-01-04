import React from "react";
import { Router, Switch } from "react-router-dom";
import { connect } from "react-redux";

import {
  playlistActions,
  subscriptionActions,
  podcastActions
} from "../actions";
import history from "../history";

import LoginLayoutRoute from "./routes/LoginLayoutRoute";
import AuthenticatedLayoutRoute from "./routes/AuthenticatedLayoutRoute";

import LoginContainer from "./login/LoginContainer";
import SignupContainer from "./signup/SignupContainer";
import SubscriptionContainer from "./subscriptions/SubscriptionContainer";
import SearchResultContainer from "./search/SearchResultContainer";
import PodcastContainer from "./podcasts/PodcastContainer";
import EpisodeContainer from "./episodes/RecentEpisodesContainer";
import PlaylistContainer from "./playlist/PlaylistContainer";
import ScrollToTop from "./ScrollToTop";

class App extends React.Component {
  componentDidMount() {
    if (this.props.auth.isSignedIn) {
      console.log("App componentDidMount hydrating the store");
      this.props.getPlaylists();
      this.props.getSubscriptions();
      // this.props.getRecentEpisodes(1);
    }
  }

  componentDidUpdate(prevProps) {
    if (!prevProps.auth.isSignedIn && this.props.auth.isSignedIn) {
      console.log("App componentDidUpdate hydrating the store");
      this.props.getPlaylists();
      this.props.getSubscriptions();
      // this.props.getRecentEpisodes(1);
    }
  }

  render() {
    const { isSignedIn } = this.props.auth;
    return (
      <Router history={history}>
        <ScrollToTop>
          <Switch>
            <LoginLayoutRoute exact path="/login" component={LoginContainer} />
            <LoginLayoutRoute
              exact
              path="/signup"
              component={SignupContainer}
            />
            <AuthenticatedLayoutRoute
              isAuthenticated={isSignedIn}
              exact
              path="/"
              component={SubscriptionContainer}
            />
            <AuthenticatedLayoutRoute
              isAuthenticated={isSignedIn}
              exact
              path="/recent"
              component={EpisodeContainer}
            />
            <AuthenticatedLayoutRoute
              isAuthenticated={isSignedIn}
              exact
              path="/playlist"
              component={PlaylistContainer}
            />
            <AuthenticatedLayoutRoute
              isAuthenticated={isSignedIn}
              exact
              path="/podcasts/:id"
              component={PodcastContainer}
            />
            <AuthenticatedLayoutRoute
              isAuthenticated={isSignedIn}
              exact
              path="/search/:term"
              component={SearchResultContainer}
            />
          </Switch>
        </ScrollToTop>
      </Router>
    );
  }
}

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(
  mapStateToProps,
  {
    getPlaylists: playlistActions.getAll,
    getSubscriptions: subscriptionActions.getAll,
    getRecentEpisodes: podcastActions.getRecentEpisodes
  }
)(App);
