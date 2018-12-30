import React from 'react'
import { connect } from 'react-redux'

import AudioPlayer from './AudioPlayer'

class PlaylistContainer extends React.Component {
  
  componentWillUnmount() {
    console.log('PlaylistContainer componentWillUnmount')
  }

  render() {
    if (!this.props.currentlyPlaying) return null

    const { currentlyPlaying: { audioLink, audioType } } = this.props
    return (
      <AudioPlayer audioLink={audioLink} audioType={audioType} />
    )
  }
}

const mapStateToProps = state => {
  return {
    currentlyPlaying: state.playlist.currentlyPlaying
  }
}

export default connect(mapStateToProps)(PlaylistContainer)