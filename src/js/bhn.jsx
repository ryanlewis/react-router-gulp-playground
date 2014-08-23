'use strict';

var React        = require('react'),
    shoe         = require('shoe'),
    stream       = shoe('/api'),

    Router       = require('react-router'),
    Routes       = Router.Routes,
    Route        = Router.Route,
    App          = require('./components/app'),
    Splash       = require('./components/splash'),
    Login        = require('./components/login'),
    ServerTime   = require('./components/server-time'),

    auth         = require('./lib/auth');

var mountNode = document.getElementById('app');


var Logout = React.createClass({
  componentDidMount: function() {
    auth.logout();
    Router.replaceWith('home');
  },

  render: function() {
    return <p>You are now logged out</p>;
  }
});

var routes = (
  <Routes>
    <Route handler={Splash} name="welcome" />
    <Route handler={Login} name="login" />
    <Route handler={Logout} name="logout" />
    <Route handler={App} name="home" path="/">
      <Route handler={ServerTime} name="server-time" />
    </Route>
  </Routes>
);

React.renderComponent(routes, mountNode);

stream.on('data', function (data) { 
  var obj = JSON.parse(data);
  App.setState({time: obj.time});
});