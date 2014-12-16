/*
 * grunt-require-grouper
 * https://github.com/jrf0110/grunt-named-modules
 *
 * Copyright (c) 2013 John Fawcett
 * Licensed under the MIT license.
 */

'use strict';

var fs    = require('fs');
var path  = require('path');

var config = {
  name: 'namedModules'
, description: 'Allows you to specify aliases for your module paths'
};

module.exports = function( grunt ){
  var logStats = function( stats ){
    for ( var key in stats ){
      grunt.log.writeln( stats[ key ].title + ':', stats[ key ].value );
    }
  };

  grunt.registerTask( config.name, config.description, function(){
    var stats = {
      numAliased: { title: 'Modules Aliased', value: 0 }
    };

    var pkg = JSON.parse(
      fs.readFileSync( path.join( process.cwd(), 'package.json' ) )
    );

    var modules = pkg[ config.name ];

    if ( !(config.name in pkg) ){
      return logStats( stats );
    }

    var aliasModule = function( name ){
      var dir   = path.join( process.cwd(), 'node_modules', name );
      var from  = path.join( process.cwd(), modules[ name ] );
      var isDir = fs.statSync( from ).isDirectory();
      var to    =  isDir ? dir : path.join( dir, 'index.js' );

      // Ensure it isn't already a node_module
      if ( fs.existsSync( path.join( dir, 'package.json' ) ) ){
        throw new Error('Cannot alias module `' + name + '` because a node module already exists with that name');
      }

      // Clear out previous
      if ( fs.existsSync( dir ) ){
        fs.unlinkSync( to );
        if ( !isDir ) fs.rmdirSync( dir );
      }

      if ( !isDir ) fs.mkdirSync( dir );
      fs.symlinkSync( from, to, isDir ? 'dir' : 'file' );

      stats.numAliased.value++;
    };

    Object.keys( modules ).forEach( aliasModule );

    logStats( stats );
  });
};