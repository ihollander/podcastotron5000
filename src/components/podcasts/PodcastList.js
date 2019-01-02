import React from "react";
import { Card } from "semantic-ui-react";

import PodcastItem from "./PodcastItem";

const PodcastList = ({ podcasts, onUnsubscribeClick, onSubscribeClick }) => {
  return (
    <Card.Group itemsPerRow={3}>
      {podcasts.map(podcast => (
        <PodcastItem
          key={podcast.id}
          podcast={podcast}
          onUnsubscribeClick={onUnsubscribeClick}
          onSubscribeClick={onSubscribeClick}
        />
      ))}
    </Card.Group>
  );
};

export default PodcastList;
