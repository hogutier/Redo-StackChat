import React, { Component } from "react";
import { connect } from "react-redux";
import { nameEntry } from '../store';

class NameEntry extends Component {
  constructor() {
    super()
    this.handleChange = this.handleChange.bind(this)
  }

  handleChange (evt) {
    this.props.entry(evt.target.value)
  }

  render() {
    return (
      <form className="form-inline">
        <label htmlFor="name">Your name: </label>
        <input
          onChange={this.handleChange}
          type="text"
          name="name"
          placeholder="Enter your name"
          className="form-control"
        />
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => {
  return {
    entry: (name) => dispatch(nameEntry(name))
  }
}

export default connect(null, mapDispatchToProps)(NameEntry)
