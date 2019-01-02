import React from "react";
import { List } from "semantic-ui-react";

import PlaylistItem from "./PlaylistItem";

const PlaylistList = ({ queue }) => {
  return (
    <List divided relaxed>
      {queue.map(item => (
        <PlaylistItem key={item.id} item={item} />
      ))}
    </List>
  );
};

export default PlaylistList;
