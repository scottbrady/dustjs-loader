/*
 * Copyright 2015 Scott Brady
 * MIT License
 * https://github.com/scottbrady/dustjs-loader/blob/master/LICENSE
 */

var path    = require('path'),
    dust    = require('dustjs-linkedin'),
    oldLoad = dust.load,
    patched = false;

module.exports = function DustjsPatchLoad (options) {
  if (patched) {
    return;
  }

  dust.load = function (name, chunk, context) {
    if (!dust.cache[name] && context.stack.head.__required) {
      var templatePath;
      if (options.path) {
        templatePath = path.join(process.cwd(), options.path, name) + '.dust';
      } else {
        templatePath = name;
      }
      require(templatePath);
    }
    return oldLoad.call(dust, name, chunk, context);
  }

  patched = true;
}