/*
 * Copyright 2015 Scott Brady
 * MIT License
 * https://github.com/scottbrady/dustjs-loader/blob/master/LICENSE
 */

var fs              = require('fs'),
    path            = require('path'),
    dust            = require('dustjs-linkedin'),
    DustjsModulize  = require('./modulize'),
    DustjsPatchLoad = require('./patch-load');

/**
 * Module to automatically compile and cache dustjs (.dust) files.
 *
 * Example using a callback:
 *
 *   require('dustjs-loader').register({path: 'lib/templates'});
 *   var template = require('./template.dust');
 *   template({ foo : 42 }, function (error, html) {
 *     if (error) { ... }
 *     ...
 *   });
 *
 * Example using a promise:
 *
 *   require('dustjs-loader').register({
 *      path    : 'lib/templates',
 *      promise : true
 *   });
 *   var template = require('./template.dust');
 *   template({ foo : 42 })
 *     .then(function (html) {
 *       ...
 *     })
 *     .catch(function (error) {
 *       ...
 *     });
 **/

var DustjsLoader = {
  /**
   * DustjsLoader.register(options)
   * - options (Object)
   **/
  register : function (options) {
    if (options == null) {
      options = {};
    }

    DustjsPatchLoad(options);

    require.extensions['.dust'] = function (module, filename) {
      var source = fs.readFileSync(filename, 'utf8'),
          name   = filename.replace(path.join(process.cwd(), '/'), ''),
          template,
          compiled;

      if (options.path) {
        name = name.replace(path.join(options.path, '/'), '');
      }

      name = name.replace('.dust', '');

      template = dust.compile(source, name);

      if (options.promise) {
        compiled = DustjsModulize.wrapWithPromise(name, template);
      } else {
        compiled = DustjsModulize.wrap(name, template);
      }

      module._compile(compiled, filename);
    };
  }
};

module.exports = DustjsLoader;