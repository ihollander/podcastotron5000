import React from "react";
import { connect } from "react-redux";

import { authActions } from "../../actions";
import LogoutButton from "./LogoutButton";

// temp auth handling: this should be moved to server side
class LogoutContainer extends React.Component {
  
  onLogoutClick = () => {
    this.props.signOut();
  };

  // Render
  render() {
    return <LogoutButton onButtonClick={this.onLogoutClick} />;
  }
}

export default connect(
  null,
  {
    signOut: authActions.signOut
  }
)(LogoutContainer);
