import React from 'react'
import { connect } from 'react-redux'

import PodcastList from '../podcasts/PodcastList'
import LoadingSpinner from '../LoadingSpinner'
import { podcastActions, subscriptionActions } from '../../actions'

class SearchResultContainer extends React.Component {

  onSubscribeClick = podcastId => {
    this.props.createSubscription(podcastId)
  }

  onUnsubscribeClick = (podcastId, subscriptionId) => {
    this.props.removeSubscription(podcastId, subscriptionId)
  }

  componentDidMount() {
    const { term } = this.props.match.params
    this.props.searchPodcasts(term)
  }

  componentDidUpdate(prevProps) {
    const { term } = this.props.match.params
    if (term !== prevProps.match.params.term) {
      this.props.searchPodcasts(term)
    }
  }

  render() {
    if (this.props.loading) return <LoadingSpinner />

    return (
      <PodcastList subscribeButtonState={this.props.createSubscriptionLoading} onUnsubscribeClick={this.onUnsubscribeClick} onSubscribeClick={this.onSubscribeClick} podcasts={this.props.searchResults} />
    )
  }
}

const mapStateToProps = state => {
  const { searchResults, searchTerm, loading } = state.search
  return {
    searchResults, searchTerm, loading
  }
}

export default connect(
  mapStateToProps,
  {
    searchPodcasts: podcastActions.search,
    createSubscription: subscriptionActions.create,
    removeSubscription: subscriptionActions.remove
  }
)(SearchResultContainer)