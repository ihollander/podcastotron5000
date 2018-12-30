import React from 'react'
import { Container, Segment } from 'semantic-ui-react'

import PlaylistContainer from './playlist/PlaylistContainer'

const Footer = () => {
  return (
    <Segment basic className="footer">
      <Container>
        <PlaylistContainer />
      </Container>
    </Segment>
  )
}

export default Footer