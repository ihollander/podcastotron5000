import React from 'react'
import { Segment } from 'semantic-ui-react'

import styles from './Footer.module.css'
import PlayerContainer from './player/PlayerContainer'

const Footer = () => {
  return (
    <Segment basic className="footer">
      <div className={styles.playerContainer}>
        <PlayerContainer />
      </div>
    </Segment>
  )
}

export default Footer