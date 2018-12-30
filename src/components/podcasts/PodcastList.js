import React from 'react'
import { Card } from 'semantic-ui-react'

import PodcastItem from './PodcastItem'

const PodcastList = props => {

  return (
    <Card.Group itemsPerRow={3}>
      {props.podcasts.map(podcast => 
        <PodcastItem 
          key={podcast.id} 
          podcast={podcast} 
          onUnsubscribeClick={props.onUnsubscribeClick} 
          onSubscribeClick={props.onSubscribeClick} />
      )}
    </Card.Group>
  )
}

export default PodcastList