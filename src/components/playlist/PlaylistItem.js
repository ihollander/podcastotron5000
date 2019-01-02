import React from "react";
import { List } from "semantic-ui-react";

const PlaylistItem = ({ item }) => {
  return (
    <List.Item>
      <List.Icon name="play" size="large" verticalAlign="middle" />
      <List.Content>
        <List.Header>{item.episode.title}</List.Header>
        <List.Description>{item.episode.podcast.name}</List.Description>
      </List.Content>
    </List.Item>
  );
};

export default PlaylistItem;
