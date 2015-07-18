/*global module:false*/
module.exports = function(grunt) {

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
          'FRONTIERS.js',
        ],
      },
      Namespaced: {
        options: {
          esnext: true,
        },
        src: [
          '_Namespaced/*.js',
          '_Namespaced/*/*.js',
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
          'Assets/*.js',
          'Assets/*/*.js',
          'Assets/*/*/*.js',
          'Assets/*/*/*/*.js',
          'Assets/*/*/*/*/*.js',
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
          'Shims/*.js',
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
          'Stubs/*.js',
          'Stubs/*/*.js',
          'Stubs/*/*/*.js',
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
          'Utilities/*.js',
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
          'Renderers/*.js',
        ]
      },
      Examples: {
        options: {
          browser: true,
          globals: {
            System: true,
            console: true,
          },
        },
        src: [
          'examples/imports/*.js',
          '!examples/imports/babel-browser.min.js',
        ],
      },
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

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // Default task.
  grunt.registerTask('default', [
    'jshint'
  ]);

};
