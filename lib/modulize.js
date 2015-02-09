/*
 * Copyright 2015 Scott Brady
 * MIT License
 * https://github.com/scottbrady/dustjs-loader/blob/master/LICENSE
 */

module.exports = {
  wrap: function(name, template) {
    return "" +
      "(function() {\n" +
      "var dust = require('dustjs-linkedin');\n" +
      template +
      "module.exports = function (context, callback) { dust.render(\"" + name + "\", context, callback); };\n" +
      "}).call(this);\n";
  },

  wrapWithPromise: function(name, template) {
    return "" +
      "(function() {\n" +
      "  var dust    = require('dustjs-linkedin'),\n" +
      "      Promise = require('bluebird');\n" +
      template +
      "  module.exports = function (context) {\n" +
      "    context.__required = true;\n" +
      "    return new Promise(function (resolve, reject) {\n" +
      "      dust.render(\"" + name + "\", context, function (error, html) {\n" +
      "        if (error) { reject(error); return; }\n" +
      "        resolve(html);\n" +
      "      });\n" +
      "    });\n" +
      "  };\n" +
      "}).call(this);";
  }
};