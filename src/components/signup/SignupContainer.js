import React from "react";
import { connect } from "react-redux";
import { Grid, Divider, Button, Segment } from "semantic-ui-react";

import history from "../../history";
import { authActions } from "../../actions";

import SignupForm from "./SignupForm";
import LoadingSpinner from "../LoadingSpinner";
import MessageDisplay from "../Message";

// temp auth handling: this should be moved to server side
class SignUpContainer extends React.Component {
  onLoginClick = () => {
    history.push("/login");
  };

  onFormSubmit = formData => {
    this.props.signUp(formData);
  };

  // Render
  render() {
    const { error, loading } = this.props;
    return (
      <>
        <Segment placeholder>
          <Grid columns={2} relaxed="very">
            <Grid.Column>
              <SignupForm onFormSubmit={this.onFormSubmit} />
            </Grid.Column>
            <Grid.Column verticalAlign="middle">
              <Button
                content="Login"
                icon="user"
                size="big"
                onClick={this.onLoginClick}
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
    signUp: authActions.signUp
  }
)(SignUpContainer);
