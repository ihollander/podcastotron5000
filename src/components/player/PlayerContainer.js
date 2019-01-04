import React from "react";
import { connect } from "react-redux";
import * as moment from "moment";
import ReactAudioPlayer from "react-audio-player";

import { playlistActions } from "../../actions/playlistActions";
import VolumeControl from "./VolumeControl";
import AudioControls from "./AudioControls";
import PlayerEpisodeInfo from "./PlayerEpisodeInfo";

// Move to redux store?
const INITIAL_PLAYER_STATE = {
  duration: null,
  currentTime: 0,
  playing: false,
  volume: 1
};

class PlayerContainer extends React.Component {
  state = INITIAL_PLAYER_STATE;

  // Lifecycle Methods
  componentWillUnmount() {
    console.log("PlayerContainer componentWillUnmount");
  }

  // Event Handlers
  onVolumeChange = e => {
    const volume = parseFloat(e.target.value)
    this.setState({ volume })
  }

  onAudioPlay = () => this.setState({ playing: true });

  onAudioPause = () => this.setState({ playing: false });

  onAudioEnded = () => {
    this.goToNextEpisode()
  };

  onAudioPlaying = currentTime => this.setState({ currentTime });

  onLoadedMetadata = () => {
    const duration = this.audioRef.audioEl.duration;
    this.setState({ duration });
  };

  onBackButtonClick = () => {
    const interval = 10; // time in seconds
    this.setState(
      prevState => {
        const currentTime =
          prevState.currentTime - interval > 0
            ? prevState.currentTime - interval
            : 0;
        return { currentTime };
      },
      () => {
        this.audioRef.audioEl.currentTime = this.state.currentTime;
      }
    );
  };

  onForwardButtonClick = () => {
    const interval = 10; // time in seconds
    this.setState(
      prevState => {
        const currentTime =
          prevState.currentTime + interval < prevState.duration
            ? prevState.currentTime + interval
            : prevState.duration;
        return { currentTime };
      },
      () => {
        this.audioRef.audioEl.currentTime = this.state.currentTime;
      }
    );
  };

  onPlayButtonClick = () => {
    this.state.playing
      ? this.audioRef.audioEl.pause()
      : this.audioRef.audioEl.play();
  };

  onStepForwardButtonClick = () => {
    this.goToNextEpisode()
  }

  onPlaybackSliderChange = e => {
    const playbackPosition = e.target.value;
    this.setState(
      prevState => {
        const currentTime = playbackPosition * prevState.duration;
        return { currentTime };
      },
      () => {
        this.audioRef.audioEl.currentTime = this.state.currentTime;
      }
    );
  };

  goToNextEpisode() {
    this.setState({ playing: false }, () => {
      this.props.currentTrackEnded(); // remove now playing
      if (this.props.queue.length) {
        const nextEpisode = this.props.queue[0]
        this.props.updateNowPlaying(nextEpisode.id); // update to next
      }
    });
  }

  // Render helpers
  get percentPlayed() {
    return this.state.duration &&
      this.state.currentTime &&
      this.state.duration > 0
      ? this.state.currentTime / this.state.duration
      : 0;
  }

  get startTime() {
    const { currentTime, duration } = this.state;
    const format = duration > 60 * 60 ? "H:mm:ss" : "m:ss";
    return currentTime ? moment.utc(currentTime * 1000).format(format) : "0:00";
  }

  get endTime() {
    const { duration } = this.state;
    const format = duration > 60 * 60 ? "H:mm:ss" : "m:ss";
    return duration ? moment.utc(duration * 1000).format(format) : "0:00";
  }

  render() {
    if (!this.props.currentlyPlaying) return null;
    const {
      currentlyPlaying: {
        audioLink,
        audioType,
        title,
        podcast: { name: artist, artworkUrl600: artwork, slug }
      }
    } = this.props;

    return (
      <>
        <PlayerEpisodeInfo
          title={title}
          artist={artist}
          artwork={artwork}
          slug={slug}
        />
        <AudioControls
          startTime={this.startTime}
          endTime={this.endTime}
          playing={this.state.playing}
          percentPlayed={this.percentPlayed}
          onPlaybackSliderChange={this.onPlaybackSliderChange}
          onBackButtonClick={this.onBackButtonClick}
          onPlayButtonClick={this.onPlayButtonClick}
          onForwardButtonClick={this.onForwardButtonClick}
          onStepForwardButtonClick={this.onStepForwardButtonClick}
        />
        <VolumeControl
          volume={this.state.volume}
          onVolumeChange={this.onVolumeChange}
         />
        <ReactAudioPlayer
          listenInterval={500}
          ref={el => {
            this.audioRef = el;
          }}
          volume={this.state.volume}
          type={audioType}
          src={audioLink}
          onPlay={this.onAudioPlay}
          onPause={this.onAudioPause}
          onEnded={this.onAudioEnded}
          onListen={this.onAudioPlaying}
          onLoadedMetadata={this.onLoadedMetadata}
          autoPlay
        />
      </>
    );
  }
}

const mapStateToProps = state => {
  const { queue, currentlyPlaying } = state.playlist;
  return { queue, currentlyPlaying };
};

export default connect(
  mapStateToProps,
  {
    currentTrackEnded: playlistActions.currentTrackEnded,
    getPlaylist: playlistActions.getAll,
    updateNowPlaying: playlistActions.updateNowPlaying
  }
)(PlayerContainer);
