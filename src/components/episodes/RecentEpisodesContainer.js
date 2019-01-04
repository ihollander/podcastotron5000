import React from "react";
import { connect } from "react-redux";

import { podcastActions, playlistActions } from "../../actions";
import RecentEpisodes from "./RecentEpisodes";
import Message from "../Message";
import LoadingSpinner from "../LoadingSpinner";

class RecentEpisodesContainer extends React.Component {
  // Lifecycle Methods
  componentDidMount() {
    console.log('RecentEpisodesContainer componentDidMount')
    // TODO: this can go away if you figure out how to update recent episodes from subscription create/remove actions
    this.props.getRecentEpisodes(this.props.page);
    window.addEventListener("scroll", this.onScroll, false);
  }

  componentWillUnmount() {
    window.removeEventListener("scroll", this.onScroll, false);
  }

  // Event handlers
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

  onRemoveFromPlaylistClick = episodeId => this.props.removePlaylist(episodeId);

  onEpisodePlayClick = episodeId => this.props.updateNowPlaying(episodeId);

  // Render
  render() {
    const { episodes, loading } = this.props;

    if (loading && !episodes.length) {
      return <LoadingSpinner />;
    } else if (!episodes.length) {
      return (
        <Message header="No subscriptions found">
          Use the search bar to find episodes and subscribe
        </Message>
      );
    } else {
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
}

const mapStateToProps = state => {
  const { episodes, page, lastPage, loading } = state.episodes;
  const { queue, currentlyUpdating } = state.playlist;
  const mappedEpisodes = episodes.reduce((arr, episode) => {
    const inPlaylist = queue.some(e => e.id === episode.id);
    const updatingPlaylist = currentlyUpdating === episode.id;
    arr.push({
      ...episode,
      artwork: episode.podcast.artworkUrl600,
      inPlaylist,
      updatingPlaylist
    });
    return arr;
  }, []);
  return { episodes: mappedEpisodes, page, lastPage, loading };
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
