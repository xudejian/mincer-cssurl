'use strict';

var assert = require('assert'),
  Mincer = require('mincer');

require('../')(Mincer);

var env = new Mincer.Environment(__dirname);
env.appendPath(__dirname + '/fixtures');

env.ContextClass.defineAssetPath(function (pathname, options) {
  var asset = this.environment.findAsset(pathname, options);
  return asset.digestPath;
});

env.enable('cssurl');

var asset = env.findAsset('example.css').toString(),
  png = env.findAsset('test.png').digestPath;
assert.ok(asset.indexOf("url('"+png+"')") !== -1,
          'should be replace orig url with asset path');
