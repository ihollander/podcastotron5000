import React from 'react'

class AudioPlayer extends React.Component {

  componentDidUpdate(prevProps) {
    if (this.props.audioLink !== prevProps.audioLink) {
      this.audio.pause()
      this.audio.load()
      this.audio.play()
    }
  }

  render() {
    return (
      <audio autoPlay controls ref={(audio) => { this.audio = audio }}>
        <source src={this.props.audioLink} type={this.props.audioType} />
      </audio>
    )
  }
}

export default AudioPlayer