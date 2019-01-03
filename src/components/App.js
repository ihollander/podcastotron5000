import React from "react";
import { Router, Switch } from "react-router-dom";
import { connect } from "react-redux";

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

const App = ({ auth: { isSignedIn } }) => {
  return (
    <Router history={history}>
      <ScrollToTop>
        <Switch>
          <LoginLayoutRoute exact path="/login" component={LoginContainer} />
          <LoginLayoutRoute exact path="/signup" component={SignupContainer} />
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
};

const mapStateToProps = state => {
  return {
    auth: state.auth
  };
};

export default connect(mapStateToProps)(App);
