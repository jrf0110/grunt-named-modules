# Grunt Named Modules

> Allows you to specify aliases for your module paths

## Getting Started

This plugin requires Grunt `~0.4.1`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-named-modules --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-named-modules');
```

## The "namedModules" task

### Overview

For now, this task has no options and assumes you're using a ```package.json``` file. In your ```package.json``` file, add a new directive called ```namedModules```:

```json
{
  "scripts": {
    "postinstall": "grunt namedModules"
  },
  ...
  "namedModules": {
    "utils": "lib/utils.js",
    "errors": "lib/errors.js",
    "middleware": "lib/middleware/index.js"
  }
}
```

The name of the module will be the key, and the full module path is the value. Now, anywhere in your code, you can just require the alias:

```javascript
var utils   = require('utils');
var errors  = require('errors');
var m       = require('middleware');
```

I would just put a watch on my ```package.json```:

```javascript
watch: {
  namedModules: {
    files: ['package.json'],
    tasks: ['namedModules'],
    options: {
      spawn: false,
    }
  }
}
```

## Contributing

In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History

1.0.0 - The initial release!
