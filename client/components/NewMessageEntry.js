import React, { Component } from 'react';
import { writeMessage, postMessage } from '../store'
import { connect } from 'react-redux'

class NewMessageEntry extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleChange(evt) {
    this.props.writeMessage(evt.target.value)
  }

  handleSubmit(evt) {
    evt.preventDefault()
    const content = this.props.newMessageEntry
    const channelId = this.props.channelId
    const nameEntry = this.props.nameEntry
    this.props.postMessage({ content, channelId, name: nameEntry })
  }

  render () {
    return (
      <form id="new-message-form" onSubmit={this.handleSubmit}>
        <div className="input-group input-group-lg">
          <input
            className="form-control"
            type="text"
            name="content"
            value={this.props.newMessageEntry}
            onChange={this.handleChange}
            placeholder="Say something nice..."
          />
          <span className="input-group-btn">
            <button className="btn btn-default" type="submit">Chat!</button>
          </span>
        </div>
      </form>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    ...state,
    newMessageEntry: state.newMessageEntry
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    writeMessage: (input) => dispatch(writeMessage(input)),
    postMessage: (message) => dispatch(postMessage(message))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(NewMessageEntry)
