import React from "react";
import { Icon } from "semantic-ui-react";

import styles from "./AudioControls.module.css";

const AudioControls = ({
  playing,
  startTime,
  endTime,
  percentPlayed,
  onPlaybackSliderChange,
  onBackButtonClick,
  onPlayButtonClick,
  onForwardButtonClick,
  onStepForwardButtonClick
}) => {
  const getProgressBarBackground = () => {
    const grad = `linear-gradient(90deg,#db2828 ${percentPlayed * 100}%,#FFF 0%)`;
    return grad;
  };

  return (
    <div className={styles.audioControls}>
      <div className={styles.playerControls}>
        <span onClick={onBackButtonClick}>
          <Icon name="backward" />
        </span>
        <span onClick={onPlayButtonClick}>
          <Icon size="big" name={playing ? "pause" : "play"} />
        </span>
        <span onClick={onForwardButtonClick}>
          <Icon name="forward" />
        </span>
        <span onClick={onStepForwardButtonClick}>
          <Icon name="step forward" />
        </span>
      </div>
      <div className={styles.playbackBar}>
        <div className={styles.progressTime}>{startTime}</div>
        <div className={styles.progressBar}>
          <input
            style={{
              background: getProgressBarBackground()
            }}
            type="range"
            onChange={onPlaybackSliderChange}
            value={percentPlayed}
            min={0}
            max={1}
            step={0.01}
          />
        </div>
        <div className={styles.progressTime}>{endTime}</div>
      </div>
    </div>
  );
};

export default AudioControls;
