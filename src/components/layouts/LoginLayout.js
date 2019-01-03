import React from "react";
import { Header } from "semantic-ui-react";

const LoginLayout = ({ children }) => (
  <div className="ui main container">
    <Header as="h1" textAlign="center">Welcome to PODCAST-O-TRON 5000</Header>
    {children}
  </div>
);

export default LoginLayout;
