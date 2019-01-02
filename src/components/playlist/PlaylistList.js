import React from "react";
import { List, Header } from "semantic-ui-react";

import PlaylistItem from "./PlaylistItem";

const PlaylistList = ({ queue, onEpisodePlayClick, onEpisodeRemoveClick }) => {
  return (
    <>
      <Header as="h2">Playlist</Header>
      <List divided relaxed>
        {queue.map(item => (
          <PlaylistItem
            onEpisodeRemoveClick={onEpisodeRemoveClick}
            onEpisodePlayClick={onEpisodePlayClick}
            key={item.id}
            item={item}
          />
        ))}
      </List>
    </>
  );
};

export default PlaylistList;
