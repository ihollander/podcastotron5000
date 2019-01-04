import React from "react";
import { Link } from "react-router-dom";
import { Card, Image, Dimmer, Button, Label } from "semantic-ui-react";

class PodcastItem extends React.Component {
  state = {
    active: false
  };

  // UI Event Handlers
  handleShow = () => this.setState({ active: true });

  handleHide = () => this.setState({ active: false });

  // Event Handlers
  onSubscribeClick = () => this.props.onSubscribeClick(this.props.podcast.id);

  onUnsubscribeClick = () => this.props.onUnsubscribeClick(this.props.podcast.id);

  // Render
  renderDimmerContent() {
    const { currentlyUpdating, slug, subscribed } = this.props.podcast;
    return (
      <>
        {subscribed ? (
          <Button
            loading={currentlyUpdating}
            onClick={this.onUnsubscribeClick}
            color="red"
          >
            Unsubscribe
          </Button>
        ) : (
          <Button loading={currentlyUpdating} onClick={this.onSubscribeClick} primary>
            Subscribe
          </Button>
        )}
        <Link to={`/podcasts/${slug}`} className="ui secondary button">
          Details
        </Link>
      </>
    );
  }

  render() {
    const {
      name,
      artworkUrl600,
      genres,
      artistName,
      trackCount
    } = this.props.podcast;
    const { active } = this.state;
    const content = this.renderDimmerContent();

    return (
      <Card>
        <Dimmer.Dimmable
          blurring
          as={Image}
          dimmed={active}
          dimmer={{ active, content, inverted: true }}
          onMouseEnter={this.handleShow}
          onMouseLeave={this.handleHide}
          src={artworkUrl600}
          alt={name}
        />
        <Card.Content>
          <Card.Header>{name}</Card.Header>
          <Card.Meta>{artistName}</Card.Meta>
        </Card.Content>
        <Card.Content extra>
          <span className="right floated">
            {genres && genres.map(g => <Label key={g.id}>{g.name}</Label>)}
          </span>
          <span>
            <Label color="blue" ribbon>{`${trackCount} episodes`}</Label>
          </span>
        </Card.Content>
      </Card>
    );
  }
}

export default PodcastItem;
