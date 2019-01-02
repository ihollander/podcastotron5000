import React from "react";

import EpisodeList from "./EpisodeList";

const RecentEpisodes = ({
  onAddToPlaylistClick,
  onRemoveFromPlaylistClick,
  onEpisodePlayClick,
  episodes
}) => (
  <>
    <h1>Recent Episodes</h1>
    <EpisodeList
      onAddToPlaylistClick={onAddToPlaylistClick}
      onRemoveFromPlaylistClick={onRemoveFromPlaylistClick}
      onEpisodePlayClick={onEpisodePlayClick}
      episodes={episodes}
    />
  </>
);

export default RecentEpisodes;
