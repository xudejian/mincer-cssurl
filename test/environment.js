'use strict';
var Mincer = require('mincer');
require('../')(Mincer);

module.exports = function () {
  var environment = new Mincer.Environment(__dirname);

  environment.appendPath('fixtures');

  environment.ContextClass.defineAssetPath(function (pathname, options) {
    var asset = environment.findAsset(pathname, options);
    return !asset ? null : ('/assets/' + asset.digestPath);
  });

  environment.enable('cssurl');

  return  environment;
};
