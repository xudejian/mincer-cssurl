/* global describe, it */
'use strict';

var assert = require('assert');

describe('Cssurl', function () {

  var env = require('./environment')();

  it('should process relative path', function () {
    var asset = env.findAsset('example.css');
    assert(asset.toString().match(/\/assets\/test-[a-f0-9]{32}.png/));
  });

  it('should process absolute path', function () {
    var asset = env.findAsset('absolute.css');
    assert(asset.toString().match(/\/assets\/test-[a-f0-9]{32}.png/));
  });
});
