import React from "react";
import { Message } from "semantic-ui-react";

const MessageDisplay = ({header, children, type}) => {
  return (
    <Message {...type}>
      <Message.Header>{header}</Message.Header>
      <p>
        {children}
      </p>
    </Message>
  );
};

export default MessageDisplay;
