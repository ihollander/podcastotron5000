import React from "react";
import { connect } from "react-redux";

import PodcastList from "../podcasts/PodcastList";
import LoadingSpinner from "../LoadingSpinner";
import Message from "../Message";
import { podcastActions, subscriptionActions } from "../../actions";

class SearchResultContainer extends React.Component {

  // Lifecycle Methods
  componentDidMount() {
    const { term } = this.props.match.params;
    this.props.searchPodcasts(term);
  }

  componentDidUpdate(prevProps) {
    const { term } = this.props.match.params;
    if (term !== prevProps.match.params.term) {
      this.props.searchPodcasts(term);
    }
  }

  // Event handlers
  onSubscribeClick = podcastId => this.props.createSubscription(podcastId);

  onUnsubscribeClick = podcastId => this.props.removeSubscription(podcastId);

  // render
  render() {
    const { searchResults, loading } = this.props;

    if (loading) {
      return <LoadingSpinner />;
    } else if (!searchResults.length) {
      return (
        <Message header="No subscriptions found">
          Use the search bar to find episodes and subscribe
        </Message>
      );
    } else {
      return (
        <PodcastList
          subscribeButtonState={this.props.createSubscriptionLoading}
          onUnsubscribeClick={this.onUnsubscribeClick}
          onSubscribeClick={this.onSubscribeClick}
          podcasts={searchResults}
        />
      );
    }
  }
}

const mapStateToProps = state => {
  const { searchResults, loading } = state.search;
  const { podcasts: subscriptions, currentlyUpdating: currentlyUpdatingPodcast } = state.subscriptions;

  // TODO: move this logic out of mapStateToProps
  const mappedResults = searchResults.map(searchPodcast => {
    const subscribed = subscriptions.some(p => p.id === searchPodcast.id)
    const currentlyUpdating = searchPodcast.id === currentlyUpdatingPodcast
    return {...searchPodcast, subscribed, currentlyUpdating }
  });

  return {
    searchResults: mappedResults,
    loading
  };
};

export default connect(
  mapStateToProps,
  {
    searchPodcasts: podcastActions.search,
    createSubscription: subscriptionActions.create,
    removeSubscription: subscriptionActions.remove
  }
)(SearchResultContainer);
