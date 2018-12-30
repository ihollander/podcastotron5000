import React from 'react'
import { Item } from 'semantic-ui-react'

import EpisodeItem from './EpisodeItem'

const EpisodeList = ({ episodes, onEpisodePlayClick }) => {

  return (
    <Item.Group divided>
      {episodes.map(episode => <EpisodeItem key={episode.id} onEpisodePlayClick={onEpisodePlayClick} episode={episode} />)}
    </Item.Group>
  )
}

export default EpisodeList