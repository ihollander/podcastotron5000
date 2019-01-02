import React from "react";
import { connect } from "react-redux";

import {
  podcastActions,
  playlistActions,
  subscriptionActions
} from "../../actions";

import PodcastInfo from "./PodcastInfo";
import EpisodeList from "../episodes/EpisodeList";
import LoadingSpinner from "../LoadingSpinner";

class PodcastContainer extends React.Component {
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPodcast(id);
  }

  onSubscribeClick = podcastId => this.props.createSubscription(podcastId);
  onUnsubscribeClick = (podcastId, subscriptionId) =>
    this.props.removeSubscription(podcastId, subscriptionId);

  onAddToPlaylistClick = episodeId => this.props.createPlaylist(episodeId);
  onRemoveFromPlaylistClick = playlistId =>
    this.props.removePlaylist(playlistId);

  onEpisodePlayClick = episodeId => this.props.updateNowPlaying(episodeId);

  render() {
    const { selectedPodcast, loading } = this.props;
    if (loading || !selectedPodcast) return <LoadingSpinner />;

    const episodes = selectedPodcast.episodes.map(e => ({
      ...e,
      podcast: selectedPodcast
    }));
    return (
      <>
        <PodcastInfo
          onSubscribeClick={this.onSubscribeClick}
          onUnsubscribeClick={this.onUnsubscribeClick}
          podcast={selectedPodcast}
        />
        <EpisodeList
          onAddToPlaylistClick={this.onAddToPlaylistClick}
          onRemoveFromPlaylistClick={this.onRemoveFromPlaylistClick}
          onEpisodePlayClick={this.onEpisodePlayClick}
          episodes={episodes}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  const { selectedPodcast, loading } = state.podcast;
  return {
    selectedPodcast,
    loading
  };
};

export default connect(
  mapStateToProps,
  {
    fetchPodcast: podcastActions.get,
    createPlaylist: playlistActions.create,
    removePlaylist: playlistActions.remove,
    updateNowPlaying: playlistActions.updateNowPlaying,
    createSubscription: subscriptionActions.create,
    removeSubscription: subscriptionActions.remove
  }
)(PodcastContainer);
