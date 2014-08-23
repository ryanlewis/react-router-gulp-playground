/** @jsx React.DOM */
'use strict';

var React = require('react');
var Router = require('react-router');
var Bootstrap = require('react-bootstrap');
var auth = require('../lib/auth');

var Input = Bootstrap.Input;
var Button = Bootstrap.Button;



var Login = React.createClass({

  statics: {
    attemptedTransition: null
  },

	getInitialState: function() {
		return {
			name: '',
			nameHelp: 'This is the name you will be known as to others',
			dirty: false,
		}
	},

	nameValid: function() {
		var length = this.state.name.length;
		return length > 3 && length < 20;
	},

  nameValidationState: function() {
  	if (!this.state.dirty) return null;
    
    return this.nameValid() ? 'success' : 'error';
  },

  handleNameChange: function() {

		var name = this.refs.name.getValue();
		var nameHelp = '';

		if (name.length > 3 && name.length <= 20) 
			nameHelp = 'Looks good to me!';
		else 
			nameHelp = 'Can you make it a reasonable length?';

  	this.setState({ name: name, dirty: true, nameHelp: nameHelp });
  },

  handleSubmit: function(e) {
  	e.preventDefault();
    
    // now login with the auth layer
    auth.login(this.state.name, function(loggedIn) {
      if (Login.attemptedTransition) {
        var transition = Login.attemptedTransition;
        Login.attemptedTransition = null;
        transition.retry();
      } else {
        Router.replaceWith('/');
      }
    });
  },

	render: function() {
		return (
			<form onSubmit={this.handleSubmit}>
				<Input 
					type="text" 
					value={this.state.name}
					placeholder="Enter your name"
					label="Your name"
					help={this.state.nameHelp}
					bsStyle={this.nameValidationState()}
					hasFeedback
					ref="name"
					onChange={this.handleNameChange} />

				<Button bsStyle="primary" type="submit">Login</Button>
			</form>
		);
	}
});

module.exports = Login;