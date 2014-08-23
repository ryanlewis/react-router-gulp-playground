/** @jsx React.DOM */
'use strict';

var React = require('react');
var Router = require('react-router');
var Bootstrap = require('react-bootstrap');
var Nav = Bootstrap.Nav;
var Link = Router.Link;

var Jumbotron = Bootstrap.Jumbotron;
var ButtonLink = require('react-router-bootstrap/lib/buttonlink');

var auth = require('../lib/auth');
var Login = require('./login');

module.exports = React.createClass({

  loggedIn: function() {
    return (
      <ButtonLink to="/">Fight!</ButtonLink>
    );
  },

  loggedOut: function() {
    return <Login />;
  },

  loggedInOrOut: function() {
    return auth.loggedIn() ? this.loggedIn() : this.loggedOut();
  },

	render: function() {
		return (
			<Jumbotron>
				<h1>Hello world - Splash</h1>
				<p>This is an example of a welcome splash</p>
				<p>
					{this.loggedInOrOut()}
				</p>
			</Jumbotron>
		);
	}
});