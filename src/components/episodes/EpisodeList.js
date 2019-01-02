import React from "react";
import { Item } from "semantic-ui-react";

import EpisodeItem from "./EpisodeItem";

const EpisodeList = ({
  episodes,
  onEpisodePlayClick,
  onAddToPlaylistClick,
  onRemoveFromPlaylistClick
}) => {
  return (
    <Item.Group divided>
      {episodes.map(episode => (
        <EpisodeItem
          key={episode.id}
          onAddToPlaylistClick={onAddToPlaylistClick}
          onRemoveFromPlaylistClick={onRemoveFromPlaylistClick}
          onEpisodePlayClick={onEpisodePlayClick}
          episode={episode}
        />
      ))}
    </Item.Group>
  );
};

export default EpisodeList;
