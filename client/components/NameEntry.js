import React, { Component } from "react";
import { connect } from "react-redux";

export default class NameEntry extends Component {
  constructor() {
    super()

  }

  render() {
    return (
      <form className="form-inline">
        <label htmlFor="name">Your name: </label>
        <input
          type="text"
          name="name"
          placeholder="Enter your name"
          className="form-control"
        />
      </form>
    );
  }
}
