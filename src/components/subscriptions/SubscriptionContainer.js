import React from "react";
import { connect } from "react-redux";

import { subscriptionActions } from "../../actions";
import PodcastList from "../podcasts/PodcastList";
import LoadingSpinner from "../LoadingSpinner";
import Message from "../Message";

class SubscriptionContainer extends React.Component {
  // Lifecycle Methods
  componentDidMount() {
    this.props.getSubscriptions();
  }

  // Event Handlers
  onUnsubscribeClick = (podcastId, subscriptionId) => {
    this.props.removeSubscription(podcastId, subscriptionId);
  };

  render() {
    if (this.props.loading) {
      return <LoadingSpinner />;
    } else if (!this.props.podcasts.length) {
      return (
        <Message header="No subscriptions found">
          Use the search bar to find episodes and subscribe
        </Message>
      );
    } else {
      return (
        <PodcastList
          onUnsubscribeClick={this.onUnsubscribeClick}
          podcasts={this.props.podcasts}
        />
      );
    }
  }
}

const mapStateToProps = state => {
  const { podcasts, loading } = state.subscriptions;
  return { podcasts, loading };
};

export default connect(
  mapStateToProps,
  {
    removeSubscription: subscriptionActions.remove,
    getSubscriptions: subscriptionActions.getAll
  }
)(SubscriptionContainer);
