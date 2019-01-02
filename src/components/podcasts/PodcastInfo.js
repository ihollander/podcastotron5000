import React from "react";
import { Grid, Image, Header, Button, Divider } from "semantic-ui-react";

const PodcastInfo = ({
  podcast: {
    id,
    name,
    artistName,
    artworkUrl600,
    description,
    subscriptions,
    subscribing
  },
  onUnsubscribeClick,
  onSubscribeClick
}) => {
  const onSubscribeButtonClick = () => {
    onSubscribeClick(id);
  };

  const onUnsubscribeButtonClick = () => {
    onUnsubscribeClick(id, subscriptions[0].subscriptions[0].id);
  };

  const renderSubscribe = () => {
    return (
      <>
        {subscriptions.length ? (
          <Button
            loading={subscribing}
            onClick={onUnsubscribeButtonClick}
            color="red"
          >
            Unsubscribe
          </Button>
        ) : (
          <Button
            loading={subscribing}
            onClick={onSubscribeButtonClick}
            primary
          >
            Subscribe
          </Button>
        )}
      </>
    );
  };

  return (
    <>
      <Grid>
        <Grid.Row>
          <Grid.Column width={4}>
            <Image src={artworkUrl600} size="medium" floated="left" />
          </Grid.Column>
          <Grid.Column width={12}>
            <Header as="h1">{name}</Header>
            <Header as="h3">{artistName}</Header>
            <p dangerouslySetInnerHTML={{ __html: description }} />
            <p>{renderSubscribe()}</p>
          </Grid.Column>
        </Grid.Row>
      </Grid>
      <Divider />
    </>
  );
};

export default PodcastInfo;
