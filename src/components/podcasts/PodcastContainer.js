import React from "react";
import { connect } from "react-redux";

import {
  podcastActions,
  playlistActions,
  subscriptionActions
} from "../../actions";

import PodcastInfo from "./PodcastInfo";
import EpisodeFilter from "../episodes/EpisodeFilter";
import EpisodeList from "../episodes/EpisodeList";
import LoadingSpinner from "../LoadingSpinner";

class PodcastContainer extends React.Component {
  // UI state
  state = {
    term: ""
  };

  onFilterChange = e => {
    this.setState({ [e.target.name]: e.target.value }, () => {});
  };

  // Lifecycle Methods
  componentDidMount() {
    const { id } = this.props.match.params;
    this.props.fetchPodcast(id);
  }

  // Event Handlers
  onSubscribeClick = podcastId => this.props.createSubscription(podcastId);

  onUnsubscribeClick = podcastId => this.props.removeSubscription(podcastId);

  onAddToPlaylistClick = episodeId => this.props.createPlaylist(episodeId);

  onRemoveFromPlaylistClick = episodeId => this.props.removePlaylist(episodeId);

  onEpisodePlayClick = episodeId => this.props.updateNowPlaying(episodeId);

  get filteredEpisodes() {
    if (this.state.term !== "") {
      return this.props.selectedPodcast.episodes.filter(e =>
        e.title.toLowerCase().includes(this.state.term.toLowerCase())
      );
    } else {
      return this.props.selectedPodcast.episodes
    }
  }

  render() {
    const { selectedPodcast, loading } = this.props;
    if (loading || !selectedPodcast) return <LoadingSpinner />;

    return (
      <>
        <PodcastInfo
          onSubscribeClick={this.onSubscribeClick}
          onUnsubscribeClick={this.onUnsubscribeClick}
          podcast={selectedPodcast}
        />
        <EpisodeFilter term={this.state.term} onInputChange={this.onFilterChange} />
        <EpisodeList
          onAddToPlaylistClick={this.onAddToPlaylistClick}
          onRemoveFromPlaylistClick={this.onRemoveFromPlaylistClick}
          onEpisodePlayClick={this.onEpisodePlayClick}
          episodes={this.filteredEpisodes}
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  const { selectedPodcast, loading } = state.podcast;
  const { queue, currentlyUpdating } = state.playlist;
  const {
    podcasts: subscriptions,
    currentlyUpdating: currentlyUpdatingSubscription
  } = state.subscriptions;

  if (selectedPodcast) {
    const subscribed = subscriptions.some(p => p.id === selectedPodcast.id);
    const mappedEpisodes = selectedPodcast.episodes.reduce((arr, episode) => {
      const inPlaylist = queue.some(e => e.id === episode.id);
      const updatingPlaylist = currentlyUpdating === episode.id;
      arr.push({
        ...episode,
        artwork: selectedPodcast.artworkUrl600,
        inPlaylist,
        updatingPlaylist
      });
      return arr;
    }, []);

    const mappedSelectedPodcast = {
      ...selectedPodcast,
      subscribed,
      currentlyUpdating: currentlyUpdatingSubscription === selectedPodcast.id,
      episodes: mappedEpisodes
    };
    return {
      selectedPodcast: mappedSelectedPodcast,
      loading
    };
  } else {
    return {
      selectedPodcast,
      loading
    };
  }
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
