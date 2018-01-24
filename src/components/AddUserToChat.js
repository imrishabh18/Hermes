import React from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import { Avatar } from './Avatar'
import { TextInput } from './TextInput'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  margin: 0 auto;
  width: 30%;
`

const SelectedUsersContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`

const SearchInput = styled(TextInput)`
`

export class AddUserToChat extends React.Component {
  state = {
    searchInput: ''
  }

  onInputChange = evt => {
    this.setState({ searchInput: evt.target.value })
  }

  onKeyUp = evt => {
    if (evt.keyCode === 13) {
      const { recipients, onChange } = this.props
      const newRecipient = this.state.searchInput

      onChange(recipients.concat(newRecipient))

      this.setState({
        searchInput: ''
      })
    }
  }

  render() {
    const { searchInput } = this.state
    const { recipients } = this.props

    return (
      <Container>
        <SearchInput fullWidth
                     placeholder="enter an id..."
                     value={searchInput}
                     onChange={this.onInputChange}
                     onKeyUp={this.onKeyUp} />
        <SelectedUsersContainer>
          {recipients.map(r => r.name || r.id).join(', ')}
        </SelectedUsersContainer>
      </Container>
    )
  }
}

AddUserToChat.propTypes = {
  recipients: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired
  })).isRequired,
  onChange: PropTypes.func.isRequired
}