import React from "react";
import { connect } from "react-redux";
import * as moment from "moment";
import ReactAudioPlayer from "react-audio-player";

import { playlistActions } from "../../actions/playlistActions";
import PlaylistControl from "./PlaylistControl";
import AudioControls from "./AudioControls";
import PlayerEpisodeInfo from "./PlayerEpisodeInfo";

// Move to redux store?
const INITIAL_PLAYER_STATE = {
  duration: null,
  currentTime: 0,
  playing: false
};

class PlayerContainer extends React.Component {
  state = INITIAL_PLAYER_STATE;

  componentDidMount() {
    this.props.getPlaylist()
  }

  componentWillUnmount() {
    console.log("PlayerContainer componentWillUnmount");
  }

  onAudioPlay = () => this.setState({ playing: true });
  onAudioPause = () => this.setState({ playing: false });

  onAudioEnded = () => {
    this.setState({ playing: false }, () => {
      this.props.currentTrackEnded();
    });
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
        <PlaylistControl />
        <ReactAudioPlayer
          listenInterval={500}
          ref={el => {
            this.audioRef = el;
          }}
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
  return {
    currentlyPlaying: state.playlist.currentlyPlaying
  };
};

export default connect(
  mapStateToProps,
  {
    currentTrackEnded: playlistActions.currentTrackEnded,
    getPlaylist: playlistActions.getAll
  }
)(PlayerContainer);
