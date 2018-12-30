import React from 'react'
import { Input } from 'semantic-ui-react'

import history from '../../history'

class SearchBar extends React.Component {
  state = { term: '' }

  onFormSubmit = e => {
    e.preventDefault()
    history.push(`/search/${this.state.term}`)
  }

  onSearchChange = e => this.setState({ term: e.target.value })

  render() {
    return (
      <form onSubmit={this.onFormSubmit}>
        <Input icon="search" type="text" placeholder="Search..." value={this.state.term} onChange={this.onSearchChange} />
      </form>
    )
  }
}

export default SearchBar