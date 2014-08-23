module.exports = {
  login: function(name, cb) {
    var cb = arguments[arguments.length - 1];

    // logged in already?
    localStorage.name = name;
    cb && cb(true);
    this.onChange(true);
  },

  logout: function(cb) {
    delete localStorage.name;
    cb && cb();
    this.onChange(false);
  },

  loggedIn: function() {
    return !!localStorage.name;
  },

  name: function() {
    return localStorage.name;
  },

  onChange: function() {}
};