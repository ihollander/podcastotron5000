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
  // Lifecycle Methods
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPodcast(id);
  }

  // Event Handlers
  onSubscribeClick = podcastId => this.props.createSubscription(podcastId);

  onUnsubscribeClick = (podcastId, subscriptionId) =>
    this.props.removeSubscription(podcastId, subscriptionId);

  onAddToPlaylistClick = episodeId => this.props.createPlaylist(episodeId);

  onRemoveFromPlaylistClick = (episodeId, playlistId) =>
    this.props.removePlaylist(episodeId, playlistId);

  onEpisodePlayClick = episodeId => this.props.updateNowPlaying(episodeId);

  render() {
    const { selectedPodcast, loading, episodes } = this.props;
    if (loading || !selectedPodcast) return <LoadingSpinner />;

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
  const { queue } = state.playlist;
  const { podcasts: subscriptions } = state.subscriptions;

  let selectedPodcastSubscriptions = [];
  if (selectedPodcast) {
    const matchSubscription = subscriptions.find(
      s => s.id === selectedPodcast.id
    );
    if (matchSubscription) {
      selectedPodcastSubscriptions = [matchSubscription];
    }
  }

  const mappedSelectedPodcast = {
    ...selectedPodcast,
    subscriptions: selectedPodcastSubscriptions
  };

  const episodes = selectedPodcast
    ? selectedPodcast.episodes.reduce((arr, episode) => {
        const playlist = queue.find(p => p.episode_id === episode.id);
        const playlists = playlist ? [playlist] : [];
        arr.push({
          ...episode,
          playlists: playlists,
          podcast: selectedPodcast
        });
        return arr;
      }, [])
    : [];
    
  return {
    selectedPodcast: mappedSelectedPodcast,
    loading,
    episodes
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
