/** @jsx React.DOM */
'use strict';

var React = require('react');

module.exports = React.createClass({
  getInitialState: function() {
    return {
      name: this.props.name || 'world',
      time: Date.now()
    };
  },

  render: function() {
    return (
      <div className="hello-world">
        <h1>Hello {this.state.name}</h1>
        <h2>The current time is {this.state.time}</h2>
      </div>
    );
  }
});