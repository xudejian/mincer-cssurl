'use strict';
var path = require('path'),
  url = require('url'),
  _ = require('lodash');

module.exports = function (Mincer) {

  function Cssurl() {
    Mincer.Template.apply(this, arguments);
  }

  Mincer.Cssurl = Cssurl;

  require('util').inherits(Cssurl, Mincer.Template);

  Cssurl.prototype.is_uri = function (str) {
    return !!url.parse(str, false, true).protocol;
  };

  Cssurl.prototype.relative_path = function (file) {
    if ((file||'').length < 1) {
      return file;
    }

    if (file[0] === '/') {
      return file.substr(1);
    }

    file = path.resolve(this.file, '..', file);
    file = path.relative(this.root, file);
    file = path.relative(this.rootPath, file);
    return file;
  };

  Cssurl.prototype.use = function(req) {
    var opt = _.isFunction(req) ? req(this) : req;
    return opt || {};
  };

  Cssurl.prototype.is_asset_path = function(path, fn) {
    return _.isFunction(fn) ? fn(path) : false;
  };

  var indexOf = function(str, dep) {
    var ds = {};
    _.forEach(dep.split(''), function(c) {
      ds[c] = true;
    });

    for (var i=0, _c = str.length; i<_c; i++) {
      if (ds[str.charAt(i)]) {
        return i;
      }
    }
    return -1;
  };

  var split = function(path, dep) {
    var idx = indexOf(path, dep);
    if (idx === -1) {
      idx = path.length;
    }
    return {
      head: path.substr(0, idx),
      tail: path.substr(idx)
    };
  };

  Cssurl.prototype.isAssetRequirable = function (pathname, context) {
    var file, stat;

    file = context.resolve(pathname);
    if (file.substr(-pathname.length) !== pathname) {
      return false;
    }
    stat = context.environment.stat(file);

    return stat && stat.isFile();
  };

  Cssurl.prototype.evaluate = function(context) {
    var self = this;
    this.root = context.environment.root;
    this.rootPath = context.rootPath;
    var option = self.use(requirements);
    var assetPath = option.assetPath || context.assetPath;
    function resolve_path(url) {
      var file = url.replace(/url\(|'|"|\)/g, '');
      if (/^data\:/.test(file)) {
        return url;
      }
      if (self.is_uri(file)) {
        return url;
      }
      if (self.is_asset_path(file, option.isAssetPath)) {
        return url;
      }

      try {
        var info = split(file, '?#');
        var rfile = self.relative_path(info.head);
        context.dependOn(rfile);
        if (!self.isAssetRequirable(rfile, context)) {
          return url;
        }

        var asset = assetPath(rfile);
        // replace backslashes with forward slashes for Windows
        asset = asset.replace(/\\/g,'/')
        if (asset) {
          return ["url('", asset, info.tail, "')"].join('');
        }
      } catch (e) {
        if (e.code !== 'FileNotFound') {
          console.error("Can't resolve asset ", file, url, e);
        }
      }
      return url;
    }

    this.data = this.data.replace(/url\([^\)]+\)/g, resolve_path);
    return this.data;
  };

  // Internal (private) requirements storage
  var requirements;


  /**
   *  Cssurl.configure(reqs) -> Void
   *  - reqs (Function|Object):
   *
   *  Allows to set Cssurl requirements.
   *
   *  Default: `undefined`.
   *
   *
   *  ##### Example
   *
   *      Cssurl.configure(reqs);
   **/
  Cssurl.configure = function (reqs) {
    requirements = _.clone(reqs);
  };

  Mincer.registerConfiguration("cssurl", {
    enable: function (self) {
      self.registerPostProcessor("text/css", Mincer.Cssurl);
    },
    disable: function (self) {
      self.unregisterPostProcessor("text/css", Mincer.Cssurl);
    }
  });
};
