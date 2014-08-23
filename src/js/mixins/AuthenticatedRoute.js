var auth = require('../lib/auth');
var Login = require('../components/login');

module.exports = {
  statics: {
    willTransitionTo: function (transition) {
      if (!auth.loggedIn()) {
        Login.attemptedTransition = transition;
        transition.redirect('/welcome');
      }
    }
  }
};