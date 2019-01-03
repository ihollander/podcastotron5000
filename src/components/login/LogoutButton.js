import React from "react";
import { Button } from "semantic-ui-react";

const LogoutButton = ({ onButtonClick }) => (
  <Button color="red" content="Logout" icon="user" onClick={onButtonClick} />
);

export default LogoutButton;
