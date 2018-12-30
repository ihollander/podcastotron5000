import React from 'react'
import * as moment from 'moment'
import { Item, Button } from 'semantic-ui-react'

const EpisodeItem = ({ episode: { audioLink, audioType, title, pubDate, description, podcast: { artworkUrl600 }}, onEpisodePlayClick }) => {

  const onPlayClick = () => {
    onEpisodePlayClick(audioLink, audioType)
  }

  return (
    <Item>
      <Item.Image size="small" src={artworkUrl600} floated="left" />
      <Item.Content>
        <Item.Header>{title}</Item.Header>
        <Item.Meta>{moment(pubDate).format("dddd, MMMM Do YYYY, h:mm a")}</Item.Meta>
        <Item.Description>
          <div dangerouslySetInnerHTML={{__html: description}} />
        </Item.Description>
        <Item.Extra>
          <Button onClick={onPlayClick} primary>Play</Button>
          <Button secondary>Add to Playlist</Button>
        </Item.Extra>
      </Item.Content>
    </Item>
  )
}

export default EpisodeItem