import React from "react";
import { connect } from "react-redux";

import { playlistActions } from "../../actions/playlistActions";
import LoadingSpinner from "../LoadingSpinner";
import PlaylistList from "./PlaylistList";

class PlaylistContainer extends React.Component {
  componentDidMount() {
    this.props.getPlaylists();
  }

  render() {
    if (this.props.loading) return <LoadingSpinner />;

    return <PlaylistList queue={this.props.queue} />;
  }
}

const mapStateToProps = state => {
  const { loading, queue } = state.playlist;
  return { loading, queue };
};

export default connect(
  mapStateToProps,
  { getPlaylists: playlistActions.getAll }
)(PlaylistContainer);
