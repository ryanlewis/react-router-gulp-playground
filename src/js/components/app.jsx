/** @jsx React.DOM */
'use strict';

var React = require('react');
var Router = require('react-router');
var AuthenticatedRoute = require('../mixins/AuthenticatedRoute');
var auth = require('../lib/auth');

/* components */
var Bootstrap = require('react-bootstrap');
var Navbar = Bootstrap.Navbar;
var Nav = Bootstrap.Nav;
var Link = Router.Link;
var NavItemLink = require('react-router-bootstrap/lib/NavItemLink');

module.exports = React.createClass({

  mixins: [AuthenticatedRoute],

	getInitialState: function() {

    var name = auth.name();

		return {
			name: name || this.props.name || 'stranger',
			time: Date.now()
		};
	},


	indexTemplate: function() {
    return (
      <div>
        <h1>Welcome {this.state.name}!</h1>
        <p>Select a function</p>
      </div>
    );
  },


	render: function() {
		return (
			<div>
				<Navbar>
					<Nav>
						<NavItemLink to="server-time">Server time</NavItemLink>
            <NavItemLink to="logout">Logout</NavItemLink>
					</Nav>
				</Navbar>

		    <div>
					{this.props.activeRouteHandler() || this.indexTemplate()}
				</div>

			</div>
		);

	}
});
