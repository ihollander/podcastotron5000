import React from "react";
import { Icon } from "semantic-ui-react";

import styles from "./VolumeControl.module.css";

const VolumeControl = ({
  volume,
  onVolumeChange
}) => {
  const getVolumeBarBackground = () => {
    const grad = `linear-gradient(90deg,#db2828 ${volume * 100}%,#FFF 0%)`;
    return grad;
  };

  return (
    <div className={styles.volumeControl}>
      <div className={styles.volumeBarContainer}>
        <span>
          <Icon name="volume down" size="big" />
        </span>
        <div className={styles.volumeBar}>
          <input
            style={{
              background: getVolumeBarBackground()
            }}
            type="range"
            onChange={onVolumeChange}
            value={volume}
            min={0}
            max={1}
            step={0.01}
          />
        </div>
      </div>
    </div>
  );
};

export default VolumeControl;
