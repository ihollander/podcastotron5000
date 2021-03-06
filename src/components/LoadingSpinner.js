import React from 'react'
import { Dimmer, Loader, Segment, Placeholder } from 'semantic-ui-react'

const LoadingSpinner = () => (
  <Segment>
    <Dimmer active>
      <Loader>Loading...</Loader>
    </Dimmer>
    <Placeholder>
      <div className='ui placeholder'>
        <Placeholder.Header image>
          <Placeholder.Line length='medium' />
          <Placeholder.Line length='full' />
        </Placeholder.Header>
        <Placeholder.Paragraph>
          <Placeholder.Line length='full' />
          <Placeholder.Line length='medium' />
        </Placeholder.Paragraph>
      </div>
    </Placeholder>
  </Segment>
)

export default LoadingSpinner