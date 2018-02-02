'use strict';

var compress = require('compression');

module.exports = function(app) {
  var config = this.config.app || {};
  if (!config.compress) return;

  app.use(compress());
};
