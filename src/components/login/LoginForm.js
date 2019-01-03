import React from "react";
import { Form, Button, Header } from "semantic-ui-react";

const INITIAL_STATE = { username: "", password: "" };
class LoginForm extends React.Component {
  state = INITIAL_STATE;

  onFormSubmit = e => {
    e.preventDefault();
    this.props.onFormSubmit(this.state);
  };

  onInputChange = e => {
    this.setState({
      [e.target.name]: e.target.value
    });
  };

  render() {
    return (
      <>
        <Header as="h3" textAlign="center">Login</Header>
        <Form onSubmit={this.onFormSubmit}>
          <Form.Field>
            <label>Username</label>
            <input
              placeholder="Username"
              name="username"
              value={this.state.username}
              onChange={this.onInputChange}
            />
          </Form.Field>
          <Form.Field>
            <label>Password</label>
            <input
              placeholder="Password"
              type="password"
              name="password"
              value={this.state.password}
              onChange={this.onInputChange}
            />
          </Form.Field>
          <Button type="submit">Submit</Button>
        </Form>
      </>
    );
  }
}

export default LoginForm;
