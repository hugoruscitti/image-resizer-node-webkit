var grunt = require('grunt');

grunt.initConfig({
  nodewebkit: {
    options: {
      platforms: ['win','osx'],
      buildDir: './webkitbuilds',
    },
    src: [
      './dist/**/*',
      'node_modules/imagemagick/**/*',
    ]
  }
});

grunt.loadNpmTasks('grunt-node-webkit-builder');
