import React from "react";
import { List, Button } from "semantic-ui-react";

const PlaylistItem = ({
  item: {
    id,
    title,
    podcast: { name }
  },
  onEpisodePlayClick,
  onEpisodeRemoveClick
}) => {
  const onPlayClick = () => onEpisodePlayClick(id);

  const onRemoveClick = () => onEpisodeRemoveClick(id);

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
