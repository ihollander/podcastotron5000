import React from "react";
import { connect } from "react-redux";
import { authActions } from "../../actions";
import LoginButton from "./LoginButton";
import LoadingSpinner from "../LoadingSpinner";

// temp auth handling: this should be moved to server side
class LoginContainer extends React.Component {
  // Lifecycle Methods
  componentDidMount() {
    window.gapi.load("client:auth2", () => {
      window.gapi.client
        .init({
          clientId:
            "91373925646-aql8oo1t0s807s40nbobeme8hluk9t2b.apps.googleusercontent.com",
          scope: "email"
        })
        .then(() => {
          this.auth = window.gapi.auth2.getAuthInstance();
          this.onAuthChange(this.auth.isSignedIn.get());
          this.auth.isSignedIn.listen(this.onAuthChange);
        });
    });
  }

  // Event Handlers
  onAuthChange = isSignedIn => {
    const userId = this.auth.currentUser.get().getId();
    isSignedIn ? this.props.signIn(userId) : this.props.signOut();
  };

  onSignOutClick = () => {
    this.auth.signOut();
  };

  onSignInClick = () => {
    this.auth.signIn();
  };

  // Render
  render() {
    const { isSignedIn, loading } = this.props;
    if (loading) return <LoadingSpinner />;

    return isSignedIn ? (
      <LoginButton buttonText="Sign Out" onButtonClick={this.onSignOutClick} />
    ) : (
      <LoginButton
        buttonText="Sign In with Google"
        onButtonClick={this.onSignInClick}
      />
    );
  }
}

const mapStateToProps = state => {
  const { isSignedIn, userId, loading } = state.auth;
  return { isSignedIn, userId, loading };
};

export default connect(
  mapStateToProps,
  {
    signIn: authActions.signIn,
    signOut: authActions.signOut
  }
)(LoginContainer);
