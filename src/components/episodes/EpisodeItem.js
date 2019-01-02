import React from "react";
import * as moment from "moment";
import { Item, Button } from "semantic-ui-react";

const EpisodeItem = ({
  episode: {
    id,
    title,
    pubDate,
    description,
    playlists,
    creatingPlaylist,
    podcast: { artworkUrl600 }
  },
  onEpisodePlayClick,
  onAddToPlaylistClick,
  onRemoveFromPlaylistClick
}) => {
  const onPlayClick = () => onEpisodePlayClick(id);
  const onAddClick = () => onAddToPlaylistClick(id);
  const onRemoveClick = () => onRemoveFromPlaylistClick(id, playlists[0].id)

  const renderPlaylistButton = () => {
    return playlists.length 
      ? <Button loading={creatingPlaylist} onClick={onRemoveClick} color="red">
        Remove From Playlist
      </Button>
      : <Button loading={creatingPlaylist} onClick={onAddClick} secondary>
      Add to Playlist
    </Button>
  }

  return (
    <Item>
      <Item.Image size="small" src={artworkUrl600} floated="left" />
      <Item.Content>
        <Item.Header>{title}</Item.Header>
        <Item.Meta>
          {moment(pubDate).format("dddd, MMMM Do YYYY, h:mm a")}
        </Item.Meta>
        <Item.Description>
          <div dangerouslySetInnerHTML={{ __html: description }} />
        </Item.Description>
        <Item.Extra>
          <Button onClick={onPlayClick} primary>
            Play
          </Button>
          {renderPlaylistButton()}
        </Item.Extra>
      </Item.Content>
    </Item>
  );
};

export default EpisodeItem;
