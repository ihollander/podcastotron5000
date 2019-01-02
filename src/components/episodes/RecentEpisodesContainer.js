import React from "react";
import { connect } from "react-redux";

import { podcastActions, playlistActions } from "../../actions";
import RecentEpisodes from "./RecentEpisodes";
import LoadingSpinner from "../LoadingSpinner";

class RecentEpisodesContainer extends React.Component {
  componentDidMount() {
    this.props.getRecentEpisodes();
  }

  onAddToPlaylistClick = episodeId => this.props.createPlaylist(episodeId);
  onRemoveFromPlaylistClick = (userId, playlistId) =>
    this.props.removePlaylist(userId, playlistId);

  onEpisodePlayClick = episodeId => this.props.updateNowPlaying(episodeId);

  render() {
    const { episodes, loading } = this.props;
    if (loading) return <LoadingSpinner />;

    return (
      <RecentEpisodes
        onAddToPlaylistClick={this.onAddToPlaylistClick}
        onRemoveFromPlaylistClick={this.onRemoveFromPlaylistClick}
        onEpisodePlayClick={this.onEpisodePlayClick}
        episodes={episodes}
      />
    );
  }
}

const mapStateToProps = state => {
  return {
    episodes: state.episodes.episodes,
    loading: state.episodes.loading
  };
};

export default connect(
  mapStateToProps,
  {
    getRecentEpisodes: podcastActions.getRecentEpisodes,
    createPlaylist: playlistActions.create,
    updateNowPlaying: playlistActions.updateNowPlaying,
    removePlaylist: playlistActions.remove
  }
)(RecentEpisodesContainer);
