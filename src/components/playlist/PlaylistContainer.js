import React from "react";
import { connect } from "react-redux";

import { playlistActions } from "../../actions/playlistActions";
import LoadingSpinner from "../LoadingSpinner";
import Message from "../Message";
import PlaylistList from "./PlaylistList";
import NowPlaying from "./NowPlaying";

class PlaylistContainer extends React.Component {
  
  // Event Handlers
  onEpisodePlayClick = episodeId => this.props.updateNowPlaying(episodeId);

  onEpisodeRemoveClick = episodeId => this.props.removePlaylist(episodeId);

  render() {
    const { loading, queue, currentlyPlaying } = this.props;

    if (loading) return <LoadingSpinner />;

    return (
      <>
        {currentlyPlaying && <NowPlaying episode={currentlyPlaying} />}
        {queue.length ? (
          <PlaylistList
            onEpisodePlayClick={this.onEpisodePlayClick}
            onEpisodeRemoveClick={this.onEpisodeRemoveClick}
            queue={queue}
          />
        ) : (
          <Message header="Nothing in playlist">
            Search podcasts or check recent episodes to add to playlist
          </Message>
        )}
      </>
    );
  }
}

const mapStateToProps = state => {
  const { loading, queue, currentlyPlaying } = state.playlist;
  return { loading, queue, currentlyPlaying };
};

export default connect(
  mapStateToProps,
  {
    getPlaylists: playlistActions.getAll,
    updateNowPlaying: playlistActions.updateNowPlaying,
    removePlaylist: playlistActions.remove
  }
)(PlaylistContainer);
