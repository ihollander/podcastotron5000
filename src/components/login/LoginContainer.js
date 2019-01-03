import React from "react";
import { connect } from "react-redux";
import { Grid, Divider, Button, Segment } from "semantic-ui-react";

import history from "../../history";
import { authActions } from "../../actions";

import LoginForm from "./LoginForm";
import LoadingSpinner from "../LoadingSpinner";
import MessageDisplay from "../Message";

// temp auth handling: this should be moved to server side
class LoginContainer extends React.Component {
  onSignUpClick = () => {
    history.push("/signup");
  };

  onFormSubmit = formData => {
    this.props.signIn(formData);
  };

  // Render
  render() {
    const { error, loading } = this.props;
    return (
      <>
        <Segment placeholder>
          <Grid columns={2} relaxed="very">
            <Grid.Column>
              <LoginForm onFormSubmit={this.onFormSubmit} />
            </Grid.Column>
            <Grid.Column verticalAlign="middle">
              <Button
                content="Sign up"
                icon="signup"
                size="big"
                onClick={this.onSignUpClick}
              />
            </Grid.Column>
          </Grid>
          <Divider vertical>Or</Divider>
        </Segment>
        {loading && <LoadingSpinner />}
        {error && (
          <MessageDisplay type={{ negative: true }} header="Login Error">
            {error.message}
          </MessageDisplay>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  const { error, loading } = state.auth;
  return { error, loading };
};

export default connect(
  mapStateToProps,
  {
    signIn: authActions.signIn
  }
)(LoginContainer);
