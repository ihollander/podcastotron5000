import React from 'react'
import { NavLink } from 'react-router-dom'
import { Menu, Container } from 'semantic-ui-react'

import SearchBar from './search/SearchBar'
import LoginContainer from './login/LoginContainer'

const Header = () => {

  return (
    <Menu inverted className="fixed">
      <Container>
        <NavLink exact to="/" className="item">Subscriptions</NavLink>
        <NavLink exact to="/recent" className="item">Recent Episodes</NavLink>
        <NavLink exact to="/playlist" className="item">Playlist</NavLink>
        <Menu.Item>
          <SearchBar />
        </Menu.Item>
        <Menu.Menu position="right">
          <Menu.Item>
            <LoginContainer />
          </Menu.Item>
        </Menu.Menu>
      </Container>
    </Menu>
  )
}

export default Header