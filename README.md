[![NPM version](https://badge.fury.io/js/dustjs-loader.svg)](http://badge.fury.io/js/dustjs-loader)

# dustjs-loader

Module to automatically compile and cache [dustjs (.dust) files](https://github.com/linkedin/dustjs).

## Installation

This package is available on npm as:

```
npm install dustjs-loader
```

## Examples

Example using a callback:

```
require('dustjs-loader').register({
  path: 'lib/templates'
});

var template = require('./template.dust');

template({ foo : 42 }, function (error, html) {
  if (error) { ... }
  ...
});
```

Example using a promise:

```
require('dustjs-loader').register({
   path    : 'lib/templates',
   promise : true
});

var template = require('./template.dust');

template({ foo : 42 })
  .then(function (html) {
    ...
  })
  .catch(function (error) {
    ...
  });
```

## Dustjs documentation

* [Dust Tutorial](https://github.com/linkedin/dustjs/wiki/Dust-Tutorial)
* [Dust little less know language constructs](https://github.com/linkedin/dustjs/wiki/Dust-little-less-know-language-constructs)
* [Demo of using template engines with express.js and node.js](https://github.com/chovy/express-template-demo)
* [Original Dustjs project by akdubya](http://akdubya.github.io/dustjs/)

## Security

* [Add additional security filters to Dustjs](https://github.com/linkedin/dustjs-filters-secure)

## License

MIT