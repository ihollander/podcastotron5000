import React from "react";
import { List, Button } from "semantic-ui-react";

const PlaylistItem = ({
  item: {
    id,
    episode_id,
    episode: {
      title,
      podcast: { name }
    }
  },
  onEpisodePlayClick,
  onEpisodeRemoveClick
}) => {
  const onPlayClick = () => {
    onEpisodePlayClick(episode_id, id);
  };

  const onRemoveClick = () => {
    onEpisodeRemoveClick(episode_id, id);
  };

  return (
    <List.Item>
      <List.Icon
        onClick={onPlayClick}
        name="play"
        size="large"
        verticalAlign="middle"
      />
      <List.Content>
        <List.Header>{title}</List.Header>
        <List.Description>
          {name}
          <Button onClick={onRemoveClick} color="red" floated="right">
            Remove
          </Button>
        </List.Description>
      </List.Content>
    </List.Item>
  );
};

export default PlaylistItem;
