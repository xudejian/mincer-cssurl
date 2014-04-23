'use strict';

module.exports = function (Mincer) {

  function Cssurl() {
    Mincer.Template.apply(this, arguments);
  }

  Mincer.Cssurl = Cssurl;

  require('util').inherits(Cssurl, Mincer.Template);

  function fix_url(css, context, locals) {
    function resolve_path(url) {
      var info = url.replace(/url\(|'|"|\)/g, '').split(/\?|#/, 2),
        path = info[0],
        query_string = info[1] || '',
        ds = query_string === '' ? '' : url.charAt(path.length);

      if (/^data\:/.test(path)) {
        return url;
      }

      try {
        path = context.assetPath(path);
      } catch (e) {
        console.error("Can't resolve image path: " + path);
      }
      return ["url('", path, ds, query_string, "')"].join('');
    }

    return css.replace(/url\([^\)]+\)/g, resolve_path);
  }

  Cssurl.prototype.evaluate = function (context, locals) {
    this.data = fix_url(this.data, context, locals);
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
