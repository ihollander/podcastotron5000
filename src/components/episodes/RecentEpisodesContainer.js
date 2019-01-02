import React from "react";
import { connect } from "react-redux";

import { podcastActions, playlistActions } from "../../actions";
import RecentEpisodes from "./RecentEpisodes";
import LoadingSpinner from "../LoadingSpinner";

class RecentEpisodesContainer extends React.Component {
  componentDidMount() {
    this.props.getRecentEpisodes(this.props.page);
    window.addEventListener("scroll", this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  onScroll = () => {
    if (
      window.innerHeight + window.pageYOffset >=
        document.body.scrollHeight - 200 &&
      !this.props.lastPage &&
      !this.props.loading
    ) {
      this.props.getRecentEpisodes(this.props.page);
    }
  };

  onAddToPlaylistClick = episodeId => this.props.createPlaylist(episodeId);

  onRemoveFromPlaylistClick = (userId, playlistId) => {
    this.props.removePlaylist(userId, playlistId);
  };

  onEpisodePlayClick = episodeId => this.props.updateNowPlaying(episodeId);

  render() {
    const { episodes, loading } = this.props;

    return (
      <>
        <RecentEpisodes
          onAddToPlaylistClick={this.onAddToPlaylistClick}
          onRemoveFromPlaylistClick={this.onRemoveFromPlaylistClick}
          onEpisodePlayClick={this.onEpisodePlayClick}
          episodes={episodes}
        />
        {loading && <LoadingSpinner />}
      </>
    );
  }
}

const mapStateToProps = state => {
  const { episodes, page, lastPage, loading } = state.episodes;
  return { episodes, page, lastPage, loading };
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
