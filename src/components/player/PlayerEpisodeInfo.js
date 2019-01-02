import React from "react";
import { Link } from "react-router-dom";

import styles from "./PlayerEpisodeInfo.module.css";

const PlayerEpisodeInfo = ({ artwork, title, artist, slug }) => {
  return (
    <div className={styles.playerEpisode}>
      <img style={{ float: "left" }} src={artwork} alt={artist} />
      <div className={styles.episodeInfo}>
        <div className={styles.episodeTitle}>{title}</div>
        <Link to={`/podcasts/${slug}`}>{artist}</Link>
      </div>
    </div>
  );
};

export default PlayerEpisodeInfo;
