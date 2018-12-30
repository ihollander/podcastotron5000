import React from 'react'

import EpisodeList from './EpisodeList'

const RecentEpisodes = ({ onEpisodePlayClick, episodes }) => (
  <>
    <h1>Recent Episodes</h1>
    <EpisodeList onEpisodePlayClick={onEpisodePlayClick} episodes={episodes} />
  </>
)

export default RecentEpisodes