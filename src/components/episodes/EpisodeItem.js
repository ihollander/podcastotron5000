import React from "react";
import * as moment from "moment";
import { Item, Button } from "semantic-ui-react";

const EpisodeItem = ({
  episode: {
    id,
    title,
    pubDate,
    description,
    podcast,
    updatingPlaylist,
    inPlaylist
  },
  onEpisodePlayClick,
  onAddToPlaylistClick,
  onRemoveFromPlaylistClick
}) => {
  // Event handlers
  const onPlayClick = () => onEpisodePlayClick(id);

  const onAddClick = () => onAddToPlaylistClick(id);

  const onRemoveClick = () => onRemoveFromPlaylistClick(id);

  // Render
  const renderPlaylistButton = () => {
    return inPlaylist ? (
      <Button loading={updatingPlaylist} onClick={onRemoveClick} color="red">
        Remove From Playlist
      </Button>
    ) : (
      <Button loading={updatingPlaylist} onClick={onAddClick} secondary>
        Add to Playlist
      </Button>
    );
  };

  return (
    <Item>
      <Item.Image
        size="small"
        src={podcast && podcast.artworkUrl600}
        floated="left"
      />
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
