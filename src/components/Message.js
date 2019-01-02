import React from "react";
import { Message } from "semantic-ui-react";

const NoSubscriptions = ({header, children}) => {
  return (
    <Message>
      <Message.Header>{header}</Message.Header>
      <p>
        {children}
      </p>
    </Message>
  );
};

export default NoSubscriptions;
