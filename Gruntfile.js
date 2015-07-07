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
      Assets: {
        options:{
          esnext: true,
          globals: {
            fetch: true,
            JXON: true,
            console: true,
          }
        },
        src: [
          'Assets/*.js',
          'Assets/*/*.js',
          'Assets/*/*/*.js',
          'Assets/*/*/*/*.js',
        ],
      },
      Stubs: {
        options: {
          esnext: true,
          globals: {
            JXON: true,
          }
        },
        src: [
          'Stubs/*.js',
          'Stubs/*/*.js',
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
    },
    watch: {
      gruntfile: {
        files: '<%= jshint.gruntfile.src %>',
        tasks: ['jshint:gruntfile']
      },
      Assets: {
        files: '<%= jshint.Assets.src %>',
        tasks: [
          'jshint:Assets',
        ],
      },
      Stubs: {
        files: '<%= jshint.Stubs.src %>',
        tasks: [
          'jshint:Stubs',
        ],
      },
      Utilities: {
        files: '<%= jshint.Assets.src %>',
        tasks: [
          'jshint:Assets',
        ],
      },
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
