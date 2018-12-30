import React from 'react'
import { connect } from 'react-redux'

import { podcastActions, playlistActions } from '../../actions'
import RecentEpisodes from './RecentEpisodes'
import LoadingSpinner from '../LoadingSpinner'

class RecentEpisodesContainer extends React.Component {

  componentDidMount() {
    this.props.getRecentEpisodes()
  }

  onEpisodePlayClick = (audioLink, audioType) => {
    this.props.updateNowPlaying(audioLink, audioType)
  }

  render() {
    const { episodes, loading } = this.props
    if (loading) return <LoadingSpinner />
    
    return (
      <RecentEpisodes onEpisodePlayClick={this.onEpisodePlayClick} episodes={episodes} />
    )
  }
}

const mapStateToProps = state => {
  return {
    episodes: state.episodes.episodes,
    loading: state.episodes.loading
  }
}

export default connect(
  mapStateToProps,
  {
    getRecentEpisodes: podcastActions.getRecentEpisodes, 
    updateNowPlaying: playlistActions.updateNowPlaying
  }
)(RecentEpisodesContainer)