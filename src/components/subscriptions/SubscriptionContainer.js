import React from 'react'
import { connect } from 'react-redux'

import { subscriptionActions } from '../../actions'
import PodcastList from '../podcasts/PodcastList'
import LoadingSpinner from '../LoadingSpinner'

class SubscriptionContainer extends React.Component {

  onUnsubscribeClick = (podcastId, subscriptionId) => {
    this.props.removeSubscription(podcastId, subscriptionId)
  }

  componentDidMount() {
    this.props.getSubscriptions()
  }

  render() {
    if (this.props.loading) return <LoadingSpinner />

    return (
      <PodcastList onUnsubscribeClick={this.onUnsubscribeClick} podcasts={this.props.podcasts} />
    )
  }
}

const mapStateToProps = state => {
  const { podcasts, loading } = state.subscriptions
  return { podcasts, loading }
}

export default connect(
  mapStateToProps,
  {
    removeSubscription: subscriptionActions.remove,
    getSubscriptions: subscriptionActions.getAll
  }
)(SubscriptionContainer)