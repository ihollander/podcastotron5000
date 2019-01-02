import React from "react";
import * as moment from "moment";
import { Header, Grid, Image, Divider } from "semantic-ui-react";

const NowPlaying = ({
  episode: {
    podcast: { artworkUrl600: artwork, artistName },
    title,
    pubDate,
    description
  }
}) => {
  return (
    <>
      <Header as="h1">Now Playing</Header>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Image src={artwork} size="medium" floated="left" />
          </Grid.Column>
          <Grid.Column width={12}>
            <Header as="h2">{title}</Header>
            <Header as="h3">{artistName}</Header>
            <p>{moment(pubDate).format("dddd, MMMM Do YYYY, h:mm a")}</p>
            <p dangerouslySetInnerHTML={{ __html: description }} />
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
    </>
  );
};

export default NowPlaying;
