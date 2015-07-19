/*global module:false*/
module.exports = function(grunt) {
module.require('load-grunt-tasks')(grunt);

  // Project configuration.
  grunt.initConfig({
    // Task configuration.
    jshint: {
      options: {
        curly: true,
        eqeqeq: true,
        immed: true,
        latedef: true,
        newcap: true,
        noarg: true,
        sub: true,
        undef: true,
        unused: true,
        boss: true,
        eqnull: true,
        globals: {}
      },
      gruntfile: {
        src: 'Gruntfile.js'
      },
      FRONTIERS: {
        options: {
          esnext: true,
        },
        src: [
          'src/FRONTIERS.js',
        ],
      },
      Namespaced: {
        options: {
          esnext: true,
        },
        src: [
          'src/_Namespaced/*.js',
          'src/_Namespaced/*/*.js',
        ],
      },
      Assets: {
        options:{
          esnext: true,
          browser: true,
          globals: {
            fetch: true,
            JXON: true,
            Uint16Array: true,
            console: true,
          }
        },
        src: [
          'src/Assets/*.js',
          'src/Assets/*/*.js',
          'src/Assets/*/*/*.js',
          'src/Assets/*/*/*/*.js',
          'src/Assets/*/*/*/*/*.js',
        ],
      },
      Shims: {
        options: {
          esnext: true,
          globals: {
            JXON: true,
            console: true,
          }
        },
        src: [
          'src/Shims/*.js',
        ]
      },
      Stubs: {
        options: {
          esnext: true,
          globals: {
            JXON: true,
            console: true,
            fetch: true,
          }
        },
        src: [
          'src/Stubs/*.js',
          'src/Stubs/*/*.js',
          'src/Stubs/*/*/*.js',
        ]
      },
      Utilities: {
        options: {
          esnext: true,
          browser: true,
          globals: {
            console: true,
            fetch: true,
          }
        },
        src: [
          'src/Utilities/*.js',
        ]
      },
      Renderers: {
        options: {
          esnext: true,
          browser: true,
          globals: {
            console: true,
            THREE: true,
            Frontiers: true,
          }
        },
        src: [
          'src/Renderers/*.js',
        ]
      },
      Examples: {
        options: {
          esnext: true,
          browser: true,
          globals: {
            System: true,
            console: true,
            alert: true,
            Frontiers: true,
            onFrontiersReady: true,
            setDisabled: true,
            THREE: true,
            require: true,
          },
        },
        src: [
          'examples/imports/*.js',
          '!examples/imports/babel-browser.min.js',
        ],
      },
    },
    babel: {
      options: {
        sourceMap: true,
        modules: 'amd',
      },
      build: {
        files: [{
          expand: true,
          src: [
            '<%= jshint.FRONTIERS.src %>',
            '<%= jshint.Assets.src %>',
            '<%= jshint.Stubs.src %>',
            '<%= jshint.Shims.src %>',
            '<%= jshint.Utilities.src %>',
            '<%= jshint.Namespaced.src %>',
            '<%= jshint.Renderers.src %>',
          ],
          dest: 'build/es5',
          ext: '.js',
        }]
      }
    },
    requirejs: {
      build: {
        options: {
          baseUrl: 'build/es5/src',
          name: 'FRONTIERS',
          out: 'build/es5.FRONTIERS.js',

      done: function(done, output) {
        var duplicates = require('rjs-build-analysis').duplicates(output);

        if (Object.keys(duplicates).length > 0) {
          grunt.log.subhead('Duplicates found in requirejs build:');
          for (var key in duplicates) {
            grunt.log.error(duplicates[key] + ": " + key);
          }
          return done(new Error('r.js built duplicate modules, please check the excludes option.'));
        } else {
          grunt.log.success("No duplicates found!");
        }

        done();
      }
        }
      }
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      lib: {
        files: [
          '<%= jshint.FRONTIERS.src %>',
          '<%= jshint.Assets.src %>',
          '<%= jshint.Stubs.src %>',
          '<%= jshint.Shims.src %>',
          '<%= jshint.Utilities.src %>',
          '<%= jshint.Namespaced.src %>',
          '<%= jshint.Renderers.src %>',
          '<%= jshint.Examples.src %>',
        ],
        tasks: [
          'jshint:FRONTIERS',
          'jshint:Assets',
          'jshint:Shims',
          'jshint:Stubs',
          'jshint:Utilities',
          'jshint:Namespaced',
          'jshint:Renderers',
          'jshint:Examples',
        ]
      }
    }
  });

  // Default task.
  grunt.registerTask('default', [
    'jshint'
  ]);

};
