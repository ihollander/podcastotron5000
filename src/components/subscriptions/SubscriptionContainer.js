import React from "react";
import { connect } from "react-redux";

import { subscriptionActions } from "../../actions";
import PodcastList from "../podcasts/PodcastList";
import LoadingSpinner from "../LoadingSpinner";
import Message from "../Message";

class SubscriptionContainer extends React.Component {

  // Event Handlers
  onUnsubscribeClick = podcastId => this.props.removeSubscription(podcastId);

  render() {
    const { loading, podcasts } = this.props;
    if (loading) {
      return <LoadingSpinner />;
    } else if (!podcasts.length) {
      return (
        <Message header="No subscriptions found">
          Use the search bar to find episodes and subscribe
        </Message>
      );
    } else {
      return (
        <PodcastList
          onUnsubscribeClick={this.onUnsubscribeClick}
          podcasts={podcasts}
        />
      );
    }
  }
}

const mapStateToProps = state => {
  const { podcasts, loading, currentlyUpdating } = state.subscriptions;
  const mappedPodcasts = podcasts.map(p => ({
    ...p,
    subscribed: true,
    currentlyUpdating: p.id === currentlyUpdating
  }));
  return { podcasts: mappedPodcasts, loading };
};

export default connect(
  mapStateToProps,
  {
    removeSubscription: subscriptionActions.remove,
    getSubscriptions: subscriptionActions.getAll
  }
)(SubscriptionContainer);
